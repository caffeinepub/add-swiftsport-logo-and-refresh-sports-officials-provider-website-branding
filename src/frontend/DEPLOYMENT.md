# Deploying SwiftSport to IC Mainnet

This guide walks you through deploying your SwiftSport application to the Internet Computer mainnet with the custom domain **swiftsportshub.com**.

## Prerequisites

Before deploying to mainnet, ensure you have:

1. **dfx CLI installed** (version 0.15.0 or later)
   ```bash
   dfx --version
   ```
   If not installed, follow the [official installation guide](https://internetcomputer.org/docs/current/developer-docs/setup/install/).

2. **Cycles wallet configured** for mainnet deployments
   - Cycles are required to deploy and run canisters on mainnet
   - You can obtain cycles through the [cycles faucet](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet) or purchase ICP and convert to cycles

3. **Identity configured** for mainnet
   ```bash
   dfx identity whoami
   ```

## Deployment Steps

### 1. Build and Deploy to Mainnet

Deploy both backend and frontend canisters to mainnet:

