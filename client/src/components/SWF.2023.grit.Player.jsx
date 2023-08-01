const player = props.player;

const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
    name: "getPlayerInfo",
    inputs: [{ type: "address", name: "player", internalType: "address" }],
  },
];

const selectPrice = (price) => {
  State.update({
    price,
  });
};

const getPlayerInfo = (_) => {
  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.getPlayerInfo(player.address).then((player) => {
    console.log(player);
    State.update({ player });
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

getPlayerInfo();

const PlayerWrapper = styled.div`
  h1 {
    margin-left: 40px;
  }
`;

const PlayerInfoWrapper = styled.div`
  display: flex;
  margin-left: 40px;

  gap: 40px;

  .label-wrapper {
    width: 100px;
  }

  .content-wrapper {
    width: 100%;
  }

  p {
    margin-bottom: 10px;
  }
`;

return (
  <>
    {state.player !== undefined ? (
      <PlayerWrapper>
        <h1>
          {state.player[0]} {state.player[1]}
        </h1>
        <hr />
        <PlayerInfoWrapper>
          <div className="label-wrapper">
            <p>포지션</p>
            <p>소속팀</p>
            <p>생년월일</p>
          </div>
          <div className="content-wrapper">
            <p>{state.player[3]}</p>
            <p>{state.player[4]}</p>
            <p>{state.player[2]}</p>
          </div>
        </PlayerInfoWrapper>
      </PlayerWrapper>
    ) : null}
  </>
);