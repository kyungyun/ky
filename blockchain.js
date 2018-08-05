const CryptoJS = require("crypto-js");

class Block{
    constructor(index, hash, previoushash, timestamp, data){
       this.index = index;
       this.hash = hash;
       this.previoushash = previoushash;
       this.timestamp = timestamp;
       this.data = data;
    }
}


const Genesisblock = new Block(
    0,
    "43BD4A43B3BAA776AE7FCB423322EAB002B6E0D68FABD5A349E9D8B34CF125C",
    null,
    1533319503797,
    'This is Genesis Block'
); // new Date.getTime() / 1000 = 1533319503797

let blockchain = [Genesisblock];

console.log(blockchain); // output


const getLastBlock = () => blockchain[blockchain.length - 1]; // function getLastBlock(){return blockchain[blockchain.length - 1]};
const getTimestamp = () => new Date().getTime() / 1000;
const createHash = (index, previoushash, timestamp, data) => CryptoJS.SHA256(index + previoushash + timestamp + data).toString(); // createHash toString


const createnewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();

    const nesHash = createHash(newBlockIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newBlockIndex, newHash, previousBlock.Hash, newTimestamp, data);
    return newBlock;
};

const getBlocksHash = (block) => createHash(block.index, block.previoushash, block.timestamp, block.JSON.stringify(data)); // checking hash same things, JSON all data

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if(!isNewStructureValid(candidateBlock)){
        console.log("The candidate block structure is not valid");
        return false;
    }else if(latestBlock.index + 1 !== candidateBlock.index){
        console.log("The candidate block does not have a valid index");
        return false;
    }else if(latestBlock.hash !== candidateBlock.previoushash){
        consloe.log("The previousHash of the candidate block is not the hash of the latest block");
        return false;
    }else if(getBlocksHash(candidateBlock) !== candidateBlock.hash){
        console.log("The hash of this block is invalid");
        return false;
    }
    return true;
};

const isNewStructureValid = (block) => {
    return(
        typeof block.index === 'number' &&
        typeof block.hash === 'string' &&
        typeof block.previoushash === 'string' &&
        typeof block.timestamp === 'number ' &&
        typeof block.data === 'string'
    );
};

const isChainValid = (candidateChain) => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(Genesisblock);
    };
    if(!isGenesisValid(candidateChian[0])){
        console.log("The candidateChains's GenesisBlock is not the same as out GenesisBlock");
        return false;
    }
    for(let i=1; i < candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i], candidateChain[i-1])){
            return false;
        }
    }
    return true;
};