State.init({
    page: 0,
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
  
  const address = "0xBBF09A10B1B8f1825cAdB58d34E0672A9Ee69c2d";
  
  const abi = [
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "getDonorsCount",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "tuple[]",
          name: "",
          internalType: "struct MyERC20.DonationInfo[]",
          components: [
            { type: "address", name: "player", internalType: "address" },
            { type: "string", name: "playerName", internalType: "string" },
            { type: "string", name: "playerKoreanName", internalType: "string" },
            { type: "string", name: "position", internalType: "string" },
            { type: "uint256", name: "amount", internalType: "uint256" },
            { type: "address", name: "donor", internalType: "address" },
            { type: "bool", name: "isPlaying", internalType: "bool" },
            { type: "string", name: "photoUrl", internalType: "string" },
          ],
        },
      ],
      name: "getMyDonationPlayers",
      inputs: [],
    },
  ];
  
  const getMyPlayers = () => {
    const cronosContract = new ethers.Contract(
      address,
      abi,
      Ethers.provider().getSigner()
    );
  
    cronosContract.getMyDonationPlayers().then((players) => {
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
  
  getMyPlayers();
  
  const MyPageWrapper = styled.div`
      .my-page-title-wrapper {
          display: flex;
          width: 40%;
          justify-content: space-between
      }
  
      .my-page-title {
          font-size: 32px;
      }
  
      .my-page-sub-title {
          font-size: 24px;
      }
  `;
  
  const ContentWrapper = styled.div`
      display: flex;
  `;
  
  const CardSelectWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 30%;
    align-content: flex-start
  `;
  
  const CardWrapper = styled.div`
      width: 50%;
      border: 1px solid;
  
      .card-image {
          width: 100%;
          height: 100%;
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
        top: 0px;
        width: 100%;
        height: Calc(100% - 40px);
        color: #fff;
      }
  
      .player-label {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
      }
  
      .flex-item {
          flex: 1;
          display: flex;
          justify-content: space-around;
      }
  
      .flex-start {
          justify-content: start;
          align-items: start;
      }
  
      .flex-end {
          align-items: end;
      }
  
      .playing-tag {
          min-width: 60px;
          background-color: ${({ isPlaying }) =>
            isPlaying === ture ? "blue" : "yellow"};
          color: ${({ isPlaying }) => (isPlaying === ture ? "#fff" : "#666")};
          text-align: center;
          border: 1px solid blue;
          border-radius: 7px;
      }
  
      .player-detail-wrapper {
          display: flex;
          justify-content: center;
          margin: 3px;
          margin-bottom: 0;
      }
  `;
  
  const PlayingWrapper = styled.div`
      width: 65%;
      height: 100%;
  
      .league-nav-wrapper {
          display: flex;
          justify-content: center;
      }
  
      .league-nav-button {
          padding: 10px 20px;
          border-radius: 25px;
          margin-bottom: 40px;
      }
  
      .field-wrapper {
          position: relative;
          display: inline-block;
          height: 600px;
          border: 1px solid;
      }
  
      .field-wrapper img {
          width: 100%;
          height: 100%;
      }
  
      .field-formation-wrapper {
          position: absolute;
          top: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
      }
  
      .field-formation-front {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          height: 300px;
      }
  
      .field-front-card {
          width: 25%;
          height: 50%;
      }
  
      .field-formation-end {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 300px;
          gap: 5%;
      }
  
      .field-end-card {
          width: 25%;
          height: 50%;
      }
  
      .card-label-wrapper {
          display: flex;
          width: 100%;
          height: 30px;
          background-color: #fff;
      }
  
      .card-label-number {
          width: 30%;
          height: 100%;
          background-color: #37003C;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  
      .card-label-name {
          width: 70%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  `;
  
  const LeagueWrapper = styled.div`
    display: flex;
    justify-content: center;
    
    .league-title {
      font-size: 24px;
      color: #999;
      margin-left: 40px;
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
  
  const Player = () => {
    if (state.players === undefined) {
      return (
        <MyPageWrapper>
          <h1 className="my-page-title">선수 불러오는 중..</h1>
        </MyPageWrapper>
      );
    }
  
    if (state.players.length === 0) {
      return (
        <MyPageWrapper>
          <h1 className="my-page-title">투자한 선수가 없습니다.</h1>
        </MyPageWrapper>
      );
    }
  
    return (
      <>
        {state.page === 0 ? (
          <MyPageWrapper>
            <div className="my-page-title-wrapper">
              <h1 className="my-page-title">마이페이지</h1>
              <h2 className="my-page-sub-title">
                5명을 선택해 라인업을 구성하세요.
              </h2>
            </div>
            <ContentWrapper>
              <CardSelectWrapper>
                {state.players.map((player, idx) => {
                  return (
                    <CardWrapper isPlaying={player[6]}>
                      <div className="card-wrapper">
                        <img className="card-image" src={player[7]} />
                        <div className="player-info">
                          <div className="player-label">
                            <div className="flex-item flex-start">
                              <p className="playing-tag">
                                {player[6] === true ? "경기중" : "대기중"}
                              </p>
                            </div>
                            <div className="flex-item flex-end">
                              <p>{player[1]}</p>
                              <p>{player[3]}</p>
                            </div>
                          </div>
                        </div>
                        <div className="player-detail-wrapper">
                          <button>상세보기</button>
                        </div>
                      </div>
                    </CardWrapper>
                  );
                })}
              </CardSelectWrapper>
              <PlayingWrapper>
                <div className="league-nav-wrapper">
                  <button
                    className="league-nav-button"
                    onClick={() => {
                      State.update({ page: 1 });
                    }}
                  >
                    원오원리그 바로참가하기
                  </button>
                </div>
                <div className="field-wrapper">
                  <img
                    src={`https://ipfs.near.social/ipfs/bafybeifuuvunlhpvt6y442u3fjlrpsnwvpxvzvrzueyjfbyx274g5a4vfe`}
                  />
                  <div className="field-formation-wrapper">
                    <div className="field-formation-front">
                      <div className="field-front-card">
                        <img src={images[1]} />
                        <div className="card-label-wrapper">
                          <p className="card-label-number">01</p>
                          <p className="card-label-name">손응민</p>
                        </div>
                      </div>
                      <div className="field-front-card">
                        <img src={images[2]} />
                        <div className="card-label-wrapper">
                          <p className="card-label-number">02</p>
                          <p className="card-label-name">이감인</p>
                        </div>
                      </div>
                    </div>
                    <div className="field-formation-end">
                      <div className="field-end-card">
                        <img src={images[3]} />
                        <div className="card-label-wrapper">
                          <p className="card-label-number">03</p>
                          <p className="card-label-name">박형준</p>
                        </div>
                      </div>
                      <div className="field-end-card">
                        <img src={images[4]} />
                        <div className="card-label-wrapper">
                          <p className="card-label-number">04</p>
                          <p className="card-label-name">홍명보</p>
                        </div>
                      </div>
                      <div className="field-end-card">
                        <img src={images[5]} />
                        <div className="card-label-wrapper">
                          <p className="card-label-number">05</p>
                          <p className="card-label-name">황휘찬</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PlayingWrapper>
            </ContentWrapper>
          </MyPageWrapper>
        ) : (
          <LeagueWrapper>
            <Widget src={`idknwhoru.near/widget/SWF.2023.grit.LeagueBanner`} />
          </LeagueWrapper>
        )}
      </>
    );
  };
  
  return <Player />;
  