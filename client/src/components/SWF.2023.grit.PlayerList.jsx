const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

State.init({
  mode: 0,
});

const images = [
  "https://ipfs.near.social/ipfs/bafkreifdek56fab4d55vun6to66dzizhy76ly65gdy3eo6lv5vnzbxgrty",
  "https://ipfs.near.social/ipfs/bafkreibslifqs6pz37vy2mrrlmogtatlg5s2d5fc4bfiv4rzcgzubgekeu",
  "https://ipfs.near.social/ipfs/bafkreibshwzbeoxguy5mot6nilssix3ilmpt6w5xv6bazvt2edbnaa5spe",
  "https://ipfs.near.social/ipfs/bafkreic5tco2sgvxdacogftgk3rlsjohb3ptqomr4o5vwtkrzvlfajnl7y",
  "https://ipfs.near.social/ipfs/bafkreigpfirgs42t4rfbbixixm4w5ukqxsbflvvn2nxl7zdktalncxqh2a",
  "https://ipfs.near.social/ipfs/bafkreias744aadzv7ivxuyoqtzwbbd6lawph5hewidapwwgyj5rnt73iri",
  "https://ipfs.near.social/ipfs/bafkreicl2wdomm22rlz2h3gt62uilbharqgh4gmfbx7j7mbnbrkkfxq564",
  "https://ipfs.near.social/ipfs/bafkreiew5g7eizlh6ms7al5y23g7juioejle2bhv3cbyqoq55upxt2dlyu",
];

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct MyERC20.PlayerInfo[]",
        components: [
          { type: "address", name: "playerAddress", internalType: "address" },
          { type: "string", name: "koreanName", internalType: "string" },
          { type: "string", name: "englishName", internalType: "string" },
          { type: "string", name: "birthDate", internalType: "string" },
          { type: "string", name: "position", internalType: "string" },
          { type: "string", name: "team", internalType: "string" },
          {
            type: "uint256",
            name: "totalDonationAmount",
            internalType: "uint256",
          },
        ],
      },
    ],
    name: "getAllPlayers",
    inputs: [],
  },
];

const getAllPlayers = () => {
  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.getAllPlayers().then((players) => {
    State.update({ players });
  });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer
    .getAddress()
    .then((address) => {
      State.update({ address });
    })
    .catch((err) => {
      console.log({ err });
    });
}

if (state.players === undefined) {
  getAllPlayers();
}

console.log(state.players);

const Card = styled.div`
    color: #fff;
    width: 25%;
    height: 100%;
    border: solid 1px #bbb;
    border-radius: 12px;
    cursor: pointer;
    padding: 7px;
    background-color: #fff;

    img {
      border: 1px solid;
      border-radius: 14px;
    }

    h1 {
      padding-left: 5px;
      font-size: 16px;
    }

    .card-wrapper {
      position: relative;
      display: inline-block; 
    }

    .player-info {
      position: absolute;
      bottom: 0%;
      width: 100%;
    }
`;

const BSNWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 10px;

    h2 {
      font-size: 11px;
      padding-left: 5px;
      margin-left: 5px;
    }

    h3 {
      font-size: 11px;
    }
`;

const PersonalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  border-top: 1px solid #fff;
  height: 30px;
  align-items: center;

  h2 {
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #E3DAFF;
    background-color: #E3DAFF;
    color: blue;
    font-size: 11px;
    border-radius: 30px;
    margin: 0;
    margin-left: 5px;
  }

  h3 {
    font-size: 11px;
    margin: 0;
  }
`;

const Cards = () => {
  if (state.players !== undefined) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {state.players.map((player, idx) => {
          if (idx > 7) {
            return null;
          }
          return (
            <Card>
              <div className="card-wrapper">
                <img src={images[idx]} width={"100%"}></img>
                <div className="player-info">
                  <h1>{player[1]}</h1>
                  <BSNWrapper>
                    <h2>{ethers.utils.formatEther(player[6])} CRO</h2>
                    <h3>{player[5]}</h3>
                  </BSNWrapper>
                  <PersonalWrapper>
                    <h2>{player[4]}</h2>
                    <h3>{player[3]}</h3>
                  </PersonalWrapper>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
};

const PlayListWrapper = styled.div`
  .playlist-label {
    color: #fff;
  }
`;

const SelectableButton = styled.button`
  width: 110px;
  height: 50px;
  border: solid 1px #39324D;
  border-radius: 30px;
  background-color: #39324D;
  color: #fff;

  ${({ mode }) => {
    return mode === state.mode
      ? `
      border: solid 1px #fff;
      background-color: #fff;
      color: #39324D;
    `
      : ``;
  }}
`;

return (
  <PlayListWrapper>
    <h1 className="playlist-label">가장 핫한 선수</h1>
    <SelectableButton
      mode={0}
      onClick={(_) => {
        State.update({ mode: 0 });
      }}
    >
      전체보기
    </SelectableButton>
    <SelectableButton
      mode={1}
      onClick={(_) => {
        State.update({ mode: 1 });
      }}
    >
      공격수
    </SelectableButton>
    <SelectableButton
      mode={2}
      onClick={(_) => {
        State.update({ mode: 2 });
      }}
    >
      수비수
    </SelectableButton>
    <SelectableButton
      mode={3}
      onClick={(_) => {
        State.update({ mode: 3 });
      }}
    >
      골키퍼
    </SelectableButton>
    <Cards />
  </PlayListWrapper>
);