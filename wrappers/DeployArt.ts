import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type DeployArtConfig = {
    res: number;
};

export function deployArtConfigToCell(config: DeployArtConfig): Cell {
    return beginCell().storeUint(config.res, 64).endCell();
}

export class DeployArt implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new DeployArt(address);
    }

    static createFromConfig(config: DeployArtConfig, code: Cell, workchain = 0) {
        const data = deployArtConfigToCell(config);
        const init = { code, data };
        return new DeployArt(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getCurrentResValue(provider: ContractProvider): Promise<number> {
        const result = await provider.get('get_res', []);
        return result.stack.readNumber();
    }
}
