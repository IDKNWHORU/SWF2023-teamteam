// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract MyERC20 is
    Context,
    Ownable,
    AccessControlEnumerable,
    ERC20Burnable,
    ERC20Pausable
{
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    bytes32 public constant SPENDER_ROLE = keccak256("SPENDER_ROLE");
    
    struct DonationInfo {
        address player;
        string playerName;
        uint256 amount;
        address donor;
    }

    struct PlayerInfo {
        address playerAddress;
        string name;
        string birthDate;
        string position;
        string team;
        uint256 totalDonationAmount;
    }

    mapping(address => PlayerInfo) private playersInfo;
    mapping(address => DonationInfo[]) private donorToDonations;
    DonationInfo[] public donations;
    address[] public donors;
    PlayerInfo[] public players;

    event DonationReceived(address indexed player, address indexed donor, uint256 amount);
    event NewPlayerAdded(address player);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        addPlayer("Son Heung-min", "1992-07-08", "Forward", "Tottenham Hotspur");
        addPlayer("Kim Young-gwon", "1990-02-27", "Defender", "Gamba Osaka");
        addPlayer("Park Ji-sung", "1981-02-25", "Midfielder", "Manchester United");
        addPlayer("Kwon Chang-hoon", "1994-06-30", "Midfielder", "SC Freiburg");
        addPlayer("Lee Kang-in", "2001-02-19", "Midfielder", "Valencia CF");
    }

    function addPlayer(
        string memory name,
        string memory birthDate,
        string memory position,
        string memory team
    ) private {
        address playerAddress = address(bytes20(keccak256(abi.encodePacked(name))));
        PlayerInfo memory newPlayer = PlayerInfo(playerAddress, name, birthDate, position, team, 0);
        players.push(newPlayer);
        playersInfo[playerAddress] = newPlayer;
        emit NewPlayerAdded(playerAddress);
    }

    function donate(address player) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        DonationInfo memory newDonation;
        newDonation.player = player;
        newDonation.amount = msg.value;
        newDonation.donor = msg.sender;

        donations.push(newDonation);

        if (!isDonorExists(msg.sender)) {
            donors.push(msg.sender);
        }

        donorToDonations[msg.sender].push(newDonation);

        updatePlayerDonationTotal(player, msg.value);

        emit DonationReceived(player, msg.sender, msg.value);
    }

    function isDonorExists(address donor) internal view returns (bool) {
        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i] == donor) {
                return true;
            }
        }
        return false;
    }

    function updatePlayerDonationTotal(address player, uint256 amount) internal {
        PlayerInfo storage playerInfo = playersInfo[player];
        playerInfo.totalDonationAmount += amount;
    }

    function getDonorsCount() public view returns (uint256) {
        return donors.length;
    }

    function getDonorByIndex(uint256 index) public view returns (address) {
        require(index < donors.length, "Invalid donor index");
        return donors[index];
    }

    function getPlayersCount() public view returns (uint256) {
        return players.length;
    }

    function getPlayerByIndex(uint256 index) public view returns (address) {
        require(index < players.length, "Invalid player index");
        return address(bytes20(keccak256(abi.encodePacked(players[index].name))));
    }

    function getAllPlayers() public view returns (PlayerInfo[] memory) {
        return players;
    }

    function getAllDonors() public view returns (address[] memory) {
        return donors;
    }

    function getMyDonationPlayers() public view returns (DonationInfo[] memory) {
        DonationInfo[] memory myDonations = donorToDonations[msg.sender];
        for (uint256 i = 0; i < myDonations.length; i++) {
            myDonations[i].playerName = playersInfo[myDonations[i].player].name;
        }
        return myDonations;
    }


    function getPlayerInfo(address player) public view returns (string memory, string memory, string memory, string memory, uint256) {
        PlayerInfo memory playerInfo = playersInfo[player];
        return (playerInfo.name, playerInfo.birthDate, playerInfo.position, playerInfo.team, playerInfo.totalDonationAmount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
