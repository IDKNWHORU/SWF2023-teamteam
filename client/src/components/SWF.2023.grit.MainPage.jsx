const ThemeWrapper = styled.div`
    background-color: #202123;

    .wallet-message {
        color: #fff;
    }
`;

const GNBWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
`;

const PlayerWrapper = styled.div`
    .playlist-wrapper{
        padding: 100px;
    }

    .playlist-label {
        color: #fff;
    }

    .nav-back {
        color: #fff;
    }

    .player-name {
        color: #fff;
    }

    .label-name  {
        color: #fff;
    }

    .content-name  {
        color: #fff;
    }

    .donate-label {
        margin-top: 40px;
        color: #fff;
    }

    .detail-player-wrapper {
        padding: 60px;
    }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 45px;
  }

  ul h2 {
    cursor: pointer;
  }

  .btn-outline-secondary {
    width: 200px;
    border-radius: 30px;
    background-color: blue;
    color: #fff;
  }
`;

State.init({
  mode: 0,
});

const LeagueWrapper = styled.div`
    display: flex;
    justify-content: center;
  
    .banner-wrapper{
        padding: 0 225px;
    }

    .league-title {
        font-size: 24px;
        color: #999;
        margin-left: 40px;
        margin-top: 40px;
    }

    .league-holder-label {
        font-size: 24px;
        color: #999;
        margin-left: 40px;
    }

    .league-holders {
        font-size: 24px;
        color: #fff;
    }

    .league-date {
        font-size: 24px;
        color: #999;
        margin-left: 40px;
    }

    hr {
        border-top: 1px solid #fff;
        opacity: 1;
    }
`;

const MyPageWrapper = styled.div`
    .my-page-wrapper {
        padding: 55px;
    }

    .my-page-title {
      color: #fff;
    }

    .my-page-sub-title {
      color: #fff;
    }

    .league-nav-button {
        border-color: #fff;
        background-color: #fff;
        color: blue;
    }
`;

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

  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

return (
  <>
    <ThemeWrapper>
      <GNBWrapper>
        <h1>
          <img
            src={`https://ipfs.near.social/ipfs/bafkreifjjw45zgdvxlawo5g4qfcvd6ba7gqifbz7xsbqnvtflhrbcgkpq4`}
          />
        </h1>
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
              원오원 리그
            </h2>
          </ul>
          <ul>
            <h2
              onClick={() => {
                State.update({ mode: 2 });
              }}
            >
              마이페이지
            </h2>
            <Web3Connect
              connectLabel="Connect To Wallet"
              disconnectLabel="DisConnect Wallet"
            />
          </ul>
        </ButtonWrapper>
      </GNBWrapper>
      {state.address === undefined ? (
        <h1 className="wallet-message">지갑을 연결해주세요.</h1>
      ) : state.chainId !== 338 ? (
        <h1 className="wallet-message">크로노스 테스트넷으로 연결해주세요.</h1>
      ) : state.mode === 0 ? (
        <PlayerWrapper>
          <Widget src={`idknwhoru.near/widget/SWF.2023.grit.PlayerList`} />
        </PlayerWrapper>
      ) : state.mode === 1 ? (
        <LeagueWrapper>
          <Widget src={`idknwhoru.near/widget/SWF.2023.grit.LeagueBanner`} />
        </LeagueWrapper>
      ) : (
        <MyPageWrapper>
          <Widget src={`idknwhoru.near/widget/SWF.2023.grit.MyPage`} />
        </MyPageWrapper>
      )}
    </ThemeWrapper>
  </>
);
