const BannerWrapper = styled.div`
    width: 80%;

    .banner-image {
        width: 100%;
    }

    .league-holders-wrapper {
        display: flex;
    }

    .league-join-button {
        width: 100%;
        height: 40px;
        background-color: blue;
        color: #fff;
        border-radius: 20px;
        margin-bottom: 40px;
        border-color: blue;
    }
`;

return (
  <BannerWrapper className="banner-wrapper">
    <div>
      <img
        className="banner-image"
        src={`https://ipfs.near.social/ipfs/bafkreidcivpo3eh3m2voreinoq2adx2yutndmgldzn4c6mmxqyfxhxzcda`}
      />
      <div>
        <h1 className="league-title">
          1등 우승: 500만원 상당의 상품권, 2등 우승: 300만원 상당의 상품권
        </h1>
        <hr />
        <div className="league-holders-wrapper">
          <h2 className="league-holder-label">참가자들:</h2>
          <p className="league-holders">1311명</p>
        </div>
        <h3 className="league-date">우승 추첨: 2023년 8월 14일 21:00시</h3>
        <hr />
        <button className="league-join-button">참가하기</button>
      </div>
      <div>
        <img
          className="banner-image"
          src={`https://ipfs.near.social/ipfs/bafkreifxtf2zrapxri4vlbkxo2qjbkyxnafqr3cri2ceurj6erqueqhna4`}
        />
      </div>
    </div>
  </BannerWrapper>
);
