import { toNano } from '@ton/core';
import { DeployArt } from '../wrappers/DeployArt';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deployArt = provider.open(DeployArt.createFromConfig({}, await compile('DeployArt')));

    await deployArt.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(deployArt.address);

    // run methods on `deployArt`
}
