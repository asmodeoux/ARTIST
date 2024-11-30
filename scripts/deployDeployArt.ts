import { toNano } from '@ton/core';
import { DeployArt } from '../wrappers/DeployArt';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deployArt = provider.open(DeployArt.createFromConfig({ res: 0 }, await compile('DeployArt')));

    await deployArt.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(deployArt.address);

    const res = await deployArt.getCurrentResValue();
    console.log('Current res value:', res);
}
