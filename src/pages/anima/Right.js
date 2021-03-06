import './right.css'

const Right = ({
  overlapGroup,
  account_Circle_Black_24Dp,
  path4,
  giorgioJaparidze,
  account_Balance_Wallet_Black_24Dp1,
  path6,
  price,
  surname3,
  surname4,
  inputText,
  expand_More_Black_24Dp,
  path1207,
  inputText2,
  topLabelProps,
  topLabel2Props,
  topLabel3Props,
  brightness_4_black_24dpProps,
  brightness_4_black_24dp2Props
}) => (
  <div className="right-container">
    {' '}
    <div className="group-37">
      <div
        className="accountcircleblack24dp"
        style={{ backgroundImage: `url(${account_Circle_Black_24Dp})` }}>
        <img className="path-4" src={path4} alt="" />
      </div>
      <div className="giorgio-japaridze">{giorgioJaparidze}</div>
    </div>
    <div className="group-34">
      <div
        className="accountbalance-etblack24dp-1"
        style={{
          backgroundImage: `url(${account_Balance_Wallet_Black_24Dp1})`
        }}>
        <img className="path-6" src={path6} alt="" />
      </div>
      <div className="price">{price}</div>
    </div>
    <TopLabel label={topLabelProps.label} />
    <div className="flex-row-4">
      <div className="group-786">
        <div className="group-35">
          <div className="surname-3">{surname3}</div>
        </div>
        <div className="group-36">
          <div className="surname-4">{surname4}</div>
        </div>
      </div>
      <div className="flex-col-1">
        <div className="overlap-group4-2">
          <div className="cursor hidden "></div>
          <TopLabel label={topLabel2Props.label} className="top-label-1" />
          <div className="group-787 border-class-1">
            <div className="x-input-text">{inputText}</div>
            <div
              className="expandmoreblack24dp"
              style={{
                backgroundImage: `url(${expand_More_Black_24Dp})`
              }}>
              <img alt="" className="path-1207" src={path1207} />
            </div>
          </div>
        </div>
        <div className="overlap-group3-1">
          <div className="cursor-1 hidden "></div>
          <div className="light-text-fiel-tlined-6-states border-class-1">
            <TopLabel label={topLabel3Props.label} className="top-label-2" />
            <div className="overlap-group5">
              <div className="x-input-text-1">{inputText2}</div>
              <div className="cursor-2 hidden "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="group-512">
      <Brightness_4_black_24dp
        brightness_4_Black_24Dp={
          brightness_4_black_24dpProps.brightness_4_Black_24Dp
        }
        path430={brightness_4_black_24dpProps.path430}
      />
      <div className="light-selection-tcha-on5-states">
        <div className="overlap-group5-3">
          <div className="light-selection-switch-2-states">
            <div className="overlap-group6">
              <div className="x-color-l-track"></div>
              <div className="shadow">
                <div className="overlap-group7">
                  <div className="rectangle"></div>
                </div>
              </div>
              <div className="x-color-l-thumb"></div>
            </div>
          </div>
          <div className="states hidden "></div>
        </div>
      </div>
      <Brightness_4_black_24dp
        path430={brightness_4_black_24dp2Props.path430}
        brightness_4_Black_24Dp={
          brightness_4_black_24dp2Props.brightness_4_Black_24Dp
        }
        className="brightnesshighblack24dp"
      />
    </div>
  </div>
)

function TopLabel(props) {
  const { label, className } = props

  return (
    <div className={`top-label hidden  ${className || ''}`}>
      <div className="overlap-group-1">
        <div className="top-border-with-ackground-color"></div>
        <div className="x-label roboto-normal-black-12px">{label}</div>
      </div>
    </div>
  )
}

function Brightness_4_black_24dp(props) {
  const { brightness_4_Black_24Dp, path430, className } = props

  return (
    <div
      className={`brightness4black24dp ${className || ''}`}
      style={{ backgroundImage: `url(${brightness_4_Black_24Dp})` }}>
      <img className="path-4-1" src={path430} />
    </div>
  )
}

function Group533(props) {
  const {
    phone,
    audnzd,
    surname,
    text7,
    text8,
    text11,
    text12,
    price,
    text9,
    price2,
    price3,
    text10,
    className
  } = props

  return (
    <div className={`group-533 ${className || ''}`}>
      <div className="phone-1 montserrat-normal-chicago-12px">{phone}</div>
      <div className="audnzd-1 montserrat-normal-chicago-12px">{audnzd}</div>
      <div className="surname-1 montserrat-bold-jungle-green-12px">
        {surname}
      </div>
      <div className="text- montserrat-normal-chicago-12px">{text7}</div>
      <div className="text--1 montserrat-normal-chicago-12px">{text8}</div>
      <div className="text--2 montserrat-normal-chicago-12px">{text11}</div>
      <div className="text--3 montserrat-normal-chicago-12px">{text12}</div>
      <div className="price-1 montserrat-bold-jungle-green-12px">{price}</div>
      <div className="text--4 montserrat-bold-chicago-12px">{text9}</div>
      <div className="price-2 montserrat-bold-chicago-12px">{price2}</div>
      <div className="price-3 montserrat-bold-chicago-12px">{price3}</div>
      <div className="text--5 montserrat-bold-chicago-12px">{text10}</div>
    </div>
  )
}

function Shield_black_24dp(props) {
  const { shield_Black_24Dp, path2 } = props

  return (
    <div
      className="shieldblack24dp"
      style={{ backgroundImage: `url(${shield_Black_24Dp})` }}>
      <img className="path-2" src={path2} />
    </div>
  )
}

export { Right }
