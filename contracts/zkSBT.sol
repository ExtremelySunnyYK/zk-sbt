// SPDX-License-Identifier: MIT
// SpartanLabs Contracts (SBT)
// Modified Version of BasicSBT by SpartanLabs @ https://github.com/SpartanLabsXyz/spartanlabs-contracts/blob/main/contracts/SoulBoundToken/BasicSBT.sol

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// Import Verification.Sol for zkSNARK verification
import "./Verification.sol";

/**
 * @dev Implementation of Soul Bound Token (SBT)
 * Following Vitalik's co-authored whitepaper at: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * Contract provides a basic Soul Bound Token mechanism, where address can mint SBT with their private data.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 */
contract BasicSBT is Ownable {
    // Name for the SBT
    string public _name;

    // Symbol for the SBT
    string public _symbol;

    // Total count of SBT
    uint256 public _totalSBT;

    // Mapping between address and the soul
    mapping(address => string) private souls;

    // Events
    event Mint(address _soul);
    event Burn(address _soul);
    event Update(address _soul);

    /**
     * @dev This modifier checks that the address passed in is not the zero address.
     */
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the SBT.
     * The `totalSBT` is set to zero.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        _totalSBT = 0;
    }

    /**
     * @dev Mints `SBT` and transfers it to `_soul`.
     *
     * Emits a {Mint} event.
     */
    function mint(address _soul, string memory _soulData)
        external
        virtual
        validAddress(_soul)
    {
        require(!hasSoul(_soul), "Soul already exists");
        souls[_soul] = _soulData;
        _totalSBT++;
        emit Mint(_soul);
    }

    /**
     * @dev Destroys SBT for a given address.
     *
     * Requirements:
     * Only the owner of the SBT can destroy it.
     * Emits a {Burn} event.
     *
     * However, projects can have it such that users can propose changes for the contract owner to update.
     */
    function burn(address _soul)
        external
        virtual
        onlyOwner
        validAddress(_soul)
    {
        require(hasSoul(_soul), "Soul does not exists");
        delete souls[_soul];
        emit Burn(_soul);
    }

    /**
     * @dev Updates the mapping of address to attribute.
     * Only the owner address is able to update the information.
     *
     * However, projects can have it such that users can propose changes for the contract owner to update.
     */
    function updateSBT(address _soul, string memory _soulData)
        public
        onlyOwner
        validAddress(_soul)
        returns (bool)
    {
        require(hasSoul(_soul), "Soul does not exist");
        souls[_soul] = _soulData;
        emit Update(_soul);
        return true;
    }

    /**
     * @dev Returns the soul data of `identity, uri` for the given address
     */
    function getSBTData(address _soul)
        public
        view
        virtual
        validAddress(_soul)
        returns (string memory)
    {
        return (souls[_soul]);
    }

    /**
     * @dev Validates if the _soul is associated with the valid data in the corresponding address.
     * By checking if the `_soulData` given in parameter is the same as the data in the struct of mapping.
     *
     * This uses the Verification.sol contract to verify the data.
     */
    function validateAttribute(address _soul) public view returns (bool) {
        require(hasSoul(_soul), "Soul does not exist");
        string memory soulData = getSBTData(_soul);

        return Verification.verifyProof(_soul, soulData); // Using zkSNARK verification
    }

    /**
     * @dev Gets the total count of SBT.
     */
    function totalSBT() public view virtual returns (uint256) {
        return _totalSBT;
    }

    /**
     * @dev Returns if two strings are equalx
     */
    function compareString(string memory a, string memory b)
        internal
        pure
        virtual
        returns (bool)
    {
        return compareMemory(bytes(a), bytes(b));
    }

    /**
     * @dev Returns if two memory arrays are equal
     */
    function compareMemory(bytes memory a, bytes memory b)
        internal
        pure
        virtual
        returns (bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    /**
     * @dev Returns whether SBT exists for a given address.
     *
     * SBT start existing when they are minted (`mint`),
     * and stop existing when they are burned (`burn`).
     */
    function hasSoul(address _soul)
        public
        view
        virtual
        validAddress(_soul)
        returns (bool)
    {
        (string memory _identity, string memory _uri) = getSBTData(_soul);
        return bytes(_identity).length > 0 && bytes(_uri).length > 0;
    }

    /**
     * @dev Returns the name of SBT.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol ticker of SBT.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }
}
