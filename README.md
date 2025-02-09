# MinAES: Provable AES Encryption on Mina Protocol

MinAES is an innovative project that integrates AES symmetric encryption as a native cryptographic primitive within Mina Protocol’s zk-native blockchain ecosystem. With Mina’s state-of-the-art zero-knowledge proof language, o1js, MinAES generates a concise 22kb proof to verify that a message has been encrypted with AES—without revealing any confidential details. This repository demonstrates both the underlying cryptographic contracts and an interactive UI for seamless deployment and interaction.

## Overview

MinAES is a proof-of-concept that showcases the integration of AES encryption within the Mina ecosystem. The project offers:

- **Provable AES Encryption:** Generates a verifiable zero-knowledge proof that confirms a message has been AES encrypted, without exposing its content.
- **Interactive UI:** An intuitive web interface to deploy, interact with, and visualize the cryptographic processes on Mina.
- **Lightweight Verification:** Utilizes Mina’s unique “proof of everything” approach to produce a proof with only 22kb of data, ensuring scalability and efficiency.

## Motivation

Mina Protocol is recognized for its privacy-enhancing zero-knowledge proofs and its ability to compress the entire chain’s history into a small, easily verifiable proof. MinAES builds on this powerful foundation by merging traditional AES encryption with modern zero-knowledge techniques. This provides a secure, scalable solution ideal for applications such as secure messaging, verifiable credentials, and other privacy-critical use cases.

## Architecture

The project is structured into two primary components:

1. **Contracts (Smart Contracts with o1js):**
   - Located in the `/contracts` directory.
   - Contains the core cryptographic logic for performing AES encryption and generating zero-knowledge proofs.
   - Interacts with the Mina blockchain to deploy and verify cryptographic operations.

2. **Interactive UI:**
   - Found in the `/ui` directory.
   - Offers a user-friendly web interface to deploy contracts, encrypt messages, and display the resulting proofs.
   - Configuration is managed via `minaNetwork.config.js`, where you specify your network settings and deployed contract addresses.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- Access to the Mina Protocol Lightnet environment
- A browser with a Mina-compatible wallet for interacting with the Lightnet

### Getting Started

1. Open a terminal and navigate to the `/contracts` directory:

   ```bash
   cd contracts
   npm run build
   ```
2. Navigate to the `/ui` directory and run the frontend
    ```bash
    cd ../ui
    npm run dev
    ```
3. Visit `http://localhost:3000/aes_demo` and you generate a proof!