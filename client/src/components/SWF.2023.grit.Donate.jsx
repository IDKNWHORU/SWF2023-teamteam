const player = props.player;
const list = [1500, 1000, 100];

const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "donate",
    inputs: [{ type: "address", name: "player", internalType: "address" }],
  },
];

const selectPrice = (price) => {
  State.update({
    price,
  });
};

const donate = (_) => {
  const price = ethers.utils.parseEther(state.price.toString()).toString();

  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.donate(player.address, { value: price }).catch((err) => {
    console.log(err);
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

const PlanCard = styled.div`
    width: 150px;
    height: 200px;
    border: solid 1px #bbb;
    cursor: pointer;
    background-color: ${(cardProps) =>
      cardProps.price === state.price ? "#E5EDFE" : "#fff"};

    .radio-button {
      width: 20px;
      height: 20px;
      border: ${(cardProps) =>
        cardProps.price === state.price ? "4px double blue" : "2px solid #ddd"};
      border-radius: 50%;
      display: inline-block;
      position: relative;
    }

    .radio-content {
      width: 100%;
      height: 100%;
      border: ${(cardProps) =>
        cardProps.price === state.price ? "none" : "none"}
        solid 1px;
      border-radius: 50%;
      background-color: ${(cardProps) =>
        cardProps.price === state.price ? "blue" : "#fff"};
    }

    .plan-content-wrapper h1{
      font-size: 12px;
    }

    .plan-content-wrapper h2{
      font-size: 24px;
    }

    .plan-content-wrapper h3{
      font-size: 12px;
    }
`;

const Cards = () => {
  if (player !== undefined) {
    return (
      <div style={{ display: "flex" }}>
        {list.map((price, idx) => (
          <PlanCard
            price={price}
            onClick={(_) => {
              selectPrice(price);
            }}
          >
            <div className="radio-button">
              <div className="radio-content"></div>
            </div>
            <div className="plan-content-wrapper">
              <h1>Level {list.length - idx}</h1>
              <h2>{price} CRO</h2>
              <h3>1개월 마다</h3>
            </div>
          </PlanCard>
        ))}
      </div>
    );
  }
};

const DonateButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 25px;
`;

return (
  <>
    <h1>투자 금액</h1>
    <Cards />
    <DonateButton onClick={donate}>투자하기</DonateButton>
  </>
);