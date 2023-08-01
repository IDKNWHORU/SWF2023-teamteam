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
        string playerKoreanName;
        uint256 amount;
        address donor;
    }

    struct PlayerInfo {
        address playerAddress;
        string koreanName;
        string englishName;
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
        addPlayer("\uae40\uc720\uccb4", "Kim Yoochul", "2007/01/22", "\uace8\ud1b5\uacf5\ud558\uad6c", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\ubc15\ud604\uc870", "Park Hyun-Jun", "2008/11/18", "\ubbf8\ub4dd\ud540", "\ud55c\uad6d\uc911\ud559\uad50");
        addPlayer("\uc774\uac10\uc778", "Lee Gam-in", "2007/07/02", "\ubbf8\ub4dd\ud540", "\ud0dc\uadf9\uace0\ub4e0\ud574");
        addPlayer("\uc18c\uc720\ucba85", "Son Heung-min", "2009/09/13", "\uacf5\uac1c\uc218", "\ub300\ud55c\uc911\ud559\uad50");
        addPlayer("\ubc15\uc9c1\uc11d", "Park Ji-seok", "2008/08/07", "\ubbf8\ub4dd\ud540", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\ud654\ud76c\ucc3d", "Hwang Hwue-chan", "2007/07/12", "\uacf5\uac1c\uc218", "\ud55c\uad6d\uace0\ub4e0\ud574");
        addPlayer("\uae40\uc778\uc7ac", "Kim In-jae", "2007/04/06", "\uc218\ube44\uc218", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\ud64d\uae40\uad00", "Hong Myoung-mo", "2008/03/19", "\uc218\ube44\uc218", "\ud0dc\uadf9\uace0\ub4e0\ud574");
        addPlayer("\uc778\uc815\ud658", "In Jung-hwan", "2007/08/04", "\uacf5\uac1c\uc218", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\uc774\uccad\uc218", "Lee Chung-soo", "2007/05/25", "\ubbf8\ub4dd\ud540", "\ud55c\uad6d\uace0\ub4e0\ud574");
        addPlayer("\uc870\ud658\ubb38", "Jo Hyun-mu", "2007/06/16", "\uace8\ubd81\uc218", "\ud0dc\uadf9\uace0\ub4e0\ud574");
        addPlayer("\uae30\uc131\uc6d0", "Ki Seon-young", "2009/10/10", "\ubbf8\ub4dd\ud540", "\ud55c\ubbfc\uc911\ud559\uad50");
        addPlayer("\uad50\ucc28\uc9c4", "Koo Cha-Jeol", "2010/11/01", "\ubbf8\ub4dd\ud540", "\ub300\ud55c\uc911\ud559\uad50");
        addPlayer("\uc774\ucc9c\uc6d0", "Lee Chun-young", "2009/02/12", "\ubbf8\ub4dd\ud540", "\ud55c\uad6d\uc911\ud559\uad50");
        addPlayer("\ubc15\uc8fc\uc5f0", "Park Ju-Yeok", "2007/03/30", "\uacf5\uac1c\uc218", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\uae40\uc9c4\ub450", "Kim Jin-du", "2008/04/18", "\uc218\ube44\uc218", "\ud0dc\uadf9\uace0\ub4e0\ud574");
        addPlayer("\ud658\ubbfc\ubca0", "Hwang Min-bum", "2009/12/11", "\ubbf8\ub4dd\ud540", "\ud55c\ubbfc\uc911\ud559\uad50");
        addPlayer("\uc870\uad6c\uc815", "Jo Kyu-jung", "2007/12/05", "\uacf5\uac1c\uc218", "\ud0dc\uadf9\uace0\ub4e0\ud574");
        addPlayer("\uc774\uc7ac\uc120", "Lee Jae-seon", "2008/12/29", "\ubbf8\ub4dd\ud540", "\uc11c\uc6b8\uace0\ub4e0\ud574");
        addPlayer("\uc774\uc720\uc7ac", "Lee Youn-jae", "2007/02/17", "\uace8\ud1b5\uacf5\ud558\uad6c", "\ud55c\uad6d\uace0\ub4e0\ud574");
    }

    function addPlayer(
        string memory koreanName,
        string memory englishName,
        string memory birthDate,
        string memory position,
        string memory team
    ) private {
        address playerAddress = address(bytes20(keccak256(abi.encodePacked(englishName))));
        PlayerInfo memory newPlayer = PlayerInfo(playerAddress, koreanName, englishName, birthDate, position, team, 0);
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

    function getAllPlayers() public view returns (PlayerInfo[] memory) {
        return players;
    }

    function getAllDonors() public view returns (address[] memory) {
        return donors;
    }

    function getMyDonationPlayers() public view returns (DonationInfo[] memory) {
        DonationInfo[] memory myDonations = donorToDonations[msg.sender];
        for (uint256 i = 0; i < myDonations.length; i++) {
            address playerAddress = myDonations[i].player;
            myDonations[i].playerName = playersInfo[playerAddress].koreanName;
            myDonations[i].playerKoreanName = playersInfo[playerAddress].koreanName;
        }
        return myDonations;
    }


    function getPlayerInfo(address player) public view returns (string memory, string memory, string memory, string memory, string memory, uint256) {
        PlayerInfo memory playerInfo = playersInfo[player];
        return (playerInfo.koreanName, playerInfo.englishName, playerInfo.birthDate, playerInfo.position, playerInfo.team, playerInfo.totalDonationAmount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
