State.init({
  mode: 0,
  page: 0,
});

const cronosContractAddress = "0xBBF09A10B1B8f1825cAdB58d34E0672A9Ee69c2d";

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
          { type: "string", name: "photoUrl", internalType: "string" },
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
    Ethers.provider()
  );

  cronosContract.getAllPlayers().then((players) => {
    State.update({ players });
  });
};

if (Ethers.provider()) {
  if (state.players === undefined) {
    getAllPlayers();
  }
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

const Card = styled.div`
    color: #fff;
    width: Calc(25% - 15px);
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
      width: 100%;
    }

    .card-wrapper img {
      width: 100%;
      height: 100%;
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
    width: 50px;
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
    const players =
      state.mode === 0
        ? state.players
        : state.mode === 1
        ? state.players.filter((player) => player[4] === "공격수")
        : state.mode === 2
        ? state.players.filter((player) => player[4] === "수비수")
        : state.mode === 3
        ? state.players.filter((player) => player[4] === "골키퍼")
        : null;
    return (
      <div className="card-list-wrapper">
        {players.map((player, idx) => {
          if (idx > 7) {
            return null;
          }
          return (
            <Card
              onClick={() => {
                State.update({ page: 2 });
                State.update({
                  player: {
                    name: player[1],
                    address: player[0],
                    team: player[5],
                    position: player[4],
                    birthDate: player[3],
                    photoUrl: player[7],
                  },
                });
              }}
            >
              <div className="card-wrapper">
                <img src={player[7]}></img>
                <div className="player-info">
                  <h1>{player[1]}</h1>
                  <BSNWrapper>
                    <h2>10 CRO</h2>
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
    margin-bottom: 40px;
  }
  .card-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    gap: 15px;
  }
`;

const SelectableButton = styled.button`
  width: 110px;
  height: 50px;
  border: solid 1px #39324D;
  border-radius: 30px;
  background-color: #39324D;
  color: #fff;
  margin-left: 15px;

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

const DetailPageWrapper = styled.div`
    hr {
        border-color: #fff;
        opacity: 1
    }

    .plan-content-wrapper {
        color: #000;
    }

    .nav-back {
      padding: 15px;
      font-size: 24px;
      margin-bottom: 40px;
      cursor: pointer;
    }

    .detail-card-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
    `;

return (
  <>
    {state.page === 0 ? (
      <PlayListWrapper className="playlist-wrapper">
        <h1 className="playlist-label">모두가 핫한 선수</h1>
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
    ) : (
      <DetailPageWrapper className="detail-player-wrapper">
        <h1
          className="nav-back"
          onClick={() => {
            State.update({ page: 0 });
          }}
        >
          돌아가기
        </h1>
        <div className="detail-card-wrapper">
          <Card>
            <div className="card-wrapper">
              <img src={state.player.photoUrl}></img>
              <div className="player-info">
                <h1>{state.player.name}</h1>
                <BSNWrapper>
                  <h2>10 CRO</h2>
                  <h3>{state.player.team}</h3>
                </BSNWrapper>
                <PersonalWrapper>
                  <h2>{state.player.position}</h2>
                  <h3>{state.player.birthDate}</h3>
                </PersonalWrapper>
              </div>
            </div>
          </Card>
        </div>
        <Widget
          src={`idknwhoru.near/widget/SWF.2023.grit.Player`}
          props={{ player: state.player }}
        />
        <Widget
          src={`idknwhoru.near/widget/SWF.2023.grit.Donate`}
          props={{ player: state.player }}
        />
      </DetailPageWrapper>
    )}
  </>
);
