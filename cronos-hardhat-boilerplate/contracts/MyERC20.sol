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
        string position;
        uint256 amount;
        address donor;
        bool isPlaying;
        string photoUrl;
    }

    struct PlayerInfo {
        address playerAddress;
        string koreanName;
        string englishName;
        string birthDate;
        string position;
        string team;
        uint256 totalDonationAmount;
        string photoUrl;
    }

    mapping(address => PlayerInfo) private playersInfo;
    mapping(address => DonationInfo[]) private donorToDonations;
    DonationInfo[] public donations;
    address[] public donors;
    PlayerInfo[] public players;

    event DonationReceived(address indexed player, address indexed donor, uint256 amount);
    event NewPlayerAdded(address player);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        addPlayer("\uAE40\uC720\uCCA0", "Kim Yoochul", "2007/01/22", "\uACE8\uD0A4\uD37C", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreifdek56fab4d55vun6to66dzizhy76ly65gdy3eo6lv5vnzbxgrty");
        addPlayer("\uBC15\uD604\uC900", "Park Hyun-Jun", "2008/11/18", "\uBBF8\uB4DC\uD544\uB354", "\ud55c\uad6d\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreibslifqs6pz37vy2mrrlmogtatlg5s2d5fc4bfiv4rzcgzubgekeu");
        addPlayer("\uC774\uAC10\uC778", "Lee Gam-in", "2007/07/02", "\uBBF8\uB4DC\uD544\uB354", "\uD0DC\uADF9\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreibshwzbeoxguy5mot6nilssix3ilmpt6w5xv6bazvt2edbnaa5spe");
        addPlayer("\uC190\uC751\uBBFC", "Son Heung-min", "2009/09/13", "\uACF5\uACA9\uC218", "\ub300\ud55c\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreic5tco2sgvxdacogftgk3rlsjohb3ptqomr4o5vwtkrzvlfajnl7y");
        addPlayer("\uBC15\uC9C0\uC11D", "Park Ji-seok", "2008/08/07", "\uBBF8\uB4DC\uD544\uB354", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreigpfirgs42t4rfbbixixm4w5ukqxsbflvvn2nxl7zdktalncxqh2a");
        addPlayer("\uD669\uD718\uCC2C", "Hwang Hwue-chan", "2007/07/12", "\uACF5\uACA9\uC218", "\uD55C\uAD6D\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreias744aadzv7ivxuyoqtzwbbd6lawph5hewidapwwgyj5rnt73iri");
        addPlayer("\uAE40\uC778\uC7AC", "Kim In-jae", "2007/04/06", "\uc218\ube44\uc218", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreicl2wdomm22rlz2h3gt62uilbharqgh4gmfbx7j7mbnbrkkfxq564");
        addPlayer("\uD64D\uBA85\uBAA8", "Hong Myoung-mo", "2008/03/19", "\uc218\ube44\uc218", "\uD0DC\uADF9\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreiew5g7eizlh6ms7al5y23g7juioejle2bhv3cbyqoq55upxt2dlyu");
        addPlayer("\uC778\uC815\uD658", "In Jung-hwan", "2007/08/04", "\uACF5\uACA9\uC218", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreifdek56fab4d55vun6to66dzizhy76ly65gdy3eo6lv5vnzbxgrty");
        addPlayer("\uC774\uCCAD\uC218", "Lee Chung-soo", "2007/05/25", "\uBBF8\uB4DC\uD544\uB354", "\uD55C\uAD6D\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreibslifqs6pz37vy2mrrlmogtatlg5s2d5fc4bfiv4rzcgzubgekeu");
        addPlayer("\uC870\uD604\uBB34", "Jo Hyun-mu", "2007/06/16", "\uace8\ubd81\uc218", "\uD0DC\uADF9\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreibshwzbeoxguy5mot6nilssix3ilmpt6w5xv6bazvt2edbnaa5spe");
        addPlayer("\uAE30\uC120\uC6A9", "Ki Seon-young", "2009/10/10", "\uBBF8\uB4DC\uD544\uB354", "\ud55c\ubbfc\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreic5tco2sgvxdacogftgk3rlsjohb3ptqomr4o5vwtkrzvlfajnl7y");
        addPlayer("\uAD6C\uCC28\uC808", "Koo Cha-Jeol", "2010/11/01", "\uBBF8\uB4DC\uD544\uB354", "\ub300\ud55c\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreigpfirgs42t4rfbbixixm4w5ukqxsbflvvn2nxl7zdktalncxqh2a");
        addPlayer("\uC774\uCC9C\uC6A9", "Lee Chun-young", "2009/02/12", "\uBBF8\uB4DC\uD544\uB354", "\ud55c\uad6d\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreias744aadzv7ivxuyoqtzwbbd6lawph5hewidapwwgyj5rnt73iri");
        addPlayer("\uBC15\uC8FC\uC5ED", "Park Ju-Yeok", "2007/03/30", "\uACF5\uACA9\uC218", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreicl2wdomm22rlz2h3gt62uilbharqgh4gmfbx7j7mbnbrkkfxq564");
        addPlayer("\uAE40\uC9C4\uB450", "Kim Jin-du", "2008/04/18", "\uc218\ube44\uc218", "\uD0DC\uADF9\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreiew5g7eizlh6ms7al5y23g7juioejle2bhv3cbyqoq55upxt2dlyu");
        addPlayer("\uD669\uBBFC\uBC94", "Hwang Min-bum", "2009/12/11", "\uBBF8\uB4DC\uD544\uB354", "\ud55c\ubbfc\uc911\ud559\uad50", "https://ipfs.near.social/ipfs/bafkreifdek56fab4d55vun6to66dzizhy76ly65gdy3eo6lv5vnzbxgrty");
        addPlayer("\uC870\uADDC\uC815", "Jo Kyu-jung", "2007/12/05", "\uACF5\uACA9\uC218", "\uD0DC\uADF9\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreibslifqs6pz37vy2mrrlmogtatlg5s2d5fc4bfiv4rzcgzubgekeu");
        addPlayer("\uC774\uC7AC\uC120", "Lee Jae-seon", "2008/12/29", "\uBBF8\uB4DC\uD544\uB354", "\uC11C\uC6B8\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreibshwzbeoxguy5mot6nilssix3ilmpt6w5xv6bazvt2edbnaa5spe");
        addPlayer("\uC774\uC724\uC7AC", "Lee Youn-jae", "2007/02/17", "\uACE8\uD0A4\uD37C", "\uD55C\uAD6D\uACE0\uB4F1\uD559\uAD50", "https://ipfs.near.social/ipfs/bafkreic5tco2sgvxdacogftgk3rlsjohb3ptqomr4o5vwtkrzvlfajnl7y");
    }

    function addPlayer(
        string memory koreanName,
        string memory englishName,
        string memory birthDate,
        string memory position,
        string memory team,
        string memory photoUrl
    ) private {
        address playerAddress = address(bytes20(keccak256(abi.encodePacked(englishName))));
        PlayerInfo memory newPlayer = PlayerInfo(playerAddress, koreanName, englishName, birthDate, position, team, 0, photoUrl);
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
        newDonation.isPlaying = false;

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
        DonationInfo[] memory myDonationDetails = new DonationInfo[](myDonations.length);

        for (uint256 i = 0; i < myDonations.length; i++) {
            DonationInfo memory donation = myDonations[i];
            address playerAddress = donation.player;
            PlayerInfo memory player = playersInfo[playerAddress];

            myDonationDetails[i].player = playerAddress;
            myDonationDetails[i].playerName = player.koreanName;
            myDonationDetails[i].position = player.position;
            myDonationDetails[i].amount = donation.amount;
            myDonationDetails[i].donor = donation.donor;
            myDonationDetails[i].photoUrl = player.photoUrl;
        }

        return myDonationDetails;
    }


    function getPlayerInfo(address player) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, string memory) {
        PlayerInfo memory playerInfo = playersInfo[player];
        return (playerInfo.koreanName, playerInfo.englishName, playerInfo.birthDate, playerInfo.position, playerInfo.team, playerInfo.totalDonationAmount, playerInfo.photoUrl);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
