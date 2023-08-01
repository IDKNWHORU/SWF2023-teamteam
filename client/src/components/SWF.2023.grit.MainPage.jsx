const ThemeWrapper = styled.div`
    background-color: #202123;
`;

const GNBWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
  }

  .btn-outline-secondary {
    width: 200px;
    border-radius: 30px;
    background-color: blue;
    color: #fff;
  }
`;

State.init({
  mode: 1,
});

const DetailPageWrapper = styled.div`
    color: #fff;

    hr {
        border-color: #fff;
        opacity: 1
    }

    .plan-content-wrapper {
        color: #000;
    }
    `;

return (
  <>
    <ThemeWrapper>
      <GNBWrapper>
        <h1>KGRIT</h1>
        <ButtonWrapper>
          <ul>
            <h2
              onClick={() => {
                State.update({ mode: 0 });
              }}
            >
              선수투자
            </h2>
            <h2
              onClick={() => {
                State.update({ mode: 1 });
              }}
            >
              AI NFT
            </h2>
          </ul>
          <Web3Connect
            connectLabel="Connect To Wallet"
            disconnectLabel="DisConnect Wallet"
          />
        </ButtonWrapper>
      </GNBWrapper>
      {state.mode === 0 ? (
        <Widget src={`idknwhoru.near/widget/SWF.2023.grit.PlayerList`} />
      ) : state.mode === 1 ? (
        <>
          <DetailPageWrapper>
            <Widget
              src={`idknwhoru.near/widget/SWF.2023.grit.Player`}
              props={props}
            />
            <Widget
              src={`idknwhoru.near/widget/SWF.2023.grit.Donate`}
              props={props}
            />
          </DetailPageWrapper>
        </>
      ) : null}
    </ThemeWrapper>
  </>
);
