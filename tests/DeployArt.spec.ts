import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { DeployArt } from '../wrappers/DeployArt';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('DeployArt', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('DeployArt');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let deployArt: SandboxContract<DeployArt>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployArt = blockchain.openContract(DeployArt.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await deployArt.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: deployArt.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and deployArt are ready to use
    });
});
