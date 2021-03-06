import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  InputNumber,
  Progress,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Table,
  Typography,
  Switch,
  Tabs,
  Image,
  Divider
} from 'antd'
import React from 'react'
import IFrame from 'react-iframe'
import {
  DollarTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyTwoTone,
  FundTwoTone,
  StopTwoTone,
  ClockCircleTwoTone,
  UserOutlined,
  SnippetsOutlined,
  SettingOutlined,
  SettingFilled,
  LoadingOutlined,
  StarFilled
} from '@ant-design/icons'
import getWindowDimensions from '../../helpers/getWindowDimensions'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { gamblingService } from '../../services/gambling.service'
import { accountService, alertService } from '../../services'
import dayjs from 'dayjs'
import useCountDown from 'react-countdown-hook'
import { HubConnectionState } from '@aspnet/signalr'
import Shield from '../../assets/shield'
import './style.css'
import consts from '../../consts'
import Title from 'antd/lib/typography/Title'
import { Option } from 'antd/lib/mentions'
import {
  BattleTab,
  BetButton,
  BetButtons,
  OrderHistory,
  Theme,
  VerticalSpace,
  WinningStreak
} from './components'
const config = require('../../config')

const Flexed = (props) =>
  props.conditions ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 16
      }}
      {...props}>
      {props.children}
    </div>
  ) : (
    <></>
  )

const initialTime = 60 * 1000 // initial time in milliseconds, defaults to 60000
const interval = 1000 // interval to change remaining time amount, defaults to 1000

const ignoreHorizontalMargins = {
  marginLeft: -55,
  marginRight: -50
}

const { TabPane } = Tabs

const Gambling = () => {
  const [isEmptyState, setIsEmptyState] = React.useState(true)
  const [isBetPlacedState, setIsBetPlacedState] = React.useState(false)
  const [isMatchStarted, setIsMatchStarted] = React.useState(false)
  const [isMatchEnded, setIsMatchEnded] = React.useState(false)

  const [betAmount, setBetAmount] = React.useState(undefined)
  const [isRiseOrFall, setIsRiseOrFall] = React.useState(null)

  const [winningText, setWinningText] = React.useState('')
  const [losingText, setLosingText] = React.useState('')

  const [won, setWon] = React.useState(null)

  const [opponentName, setOpponentName] = React.useState('')
  const [openPrice, setOpenPrice] = React.useState(0)
  const [threshold, setThreshold] = React.useState(0)
  const [currentPrice, setCurrentPrice] = React.useState(0)

  const [unix, setUnix] = React.useState(0)
  const [timeThreshold, setTimeThreshold] = React.useState(0)
  const [startUnix, setStartUnix] = React.useState(0)
  const [time, setTime] = React.useState(new Date(0))
  const [timeString, setTimeString] = React.useState('')

  const [currentBalance, setCurrentBalance] = React.useState(0)

  const [startDate, setStartDate] = React.useState(new Date(0))

  const [timeLeft, { start, pause, resume, resets }] = useCountDown(
    initialTime,
    interval
  )

  const [stateInitialized, setStateInitialized] = React.useState(false)

  const [username, setUsername] = React.useState(
    `${accountService.userValue?.firstName} ${accountService.userValue?.lastName}`
  )

  const [orderHistory, setOrderHistory] = React.useState([])
  const [winningStreaks, setWinningStreaks] = React.useState([])

  React.useEffect(() => {
    accountService.getBalance().then((balance) => setCurrentBalance(balance))
    getTableData()
  }, [])

  const getTableData = () => {
    gamblingService.getTableData().then((data) => {
      setOrderHistory(data.orderHistory)
      setWinningStreaks(data.winningStreaks)
    })
  }

  React.useEffect(() => {
    //   gamblingService.connection.start().then(() => {
    // gamblingService.getGame().then(response => {
    //   if (response.state === 'NotFound') setStateInitialized(true)
    //   if (response.state === 'Matched') {
    //     MatchPending(message.opponentName)
    //     setOpenPrice(response.game.startPrice)
    //     setThreshold(message.threshold)
    //     setTimeThreshold(message.unixThreshold)
    //     setStartUnix(message.startUnix)

    //     start()
    //   }
    // })
    hookOnEvents()
    if (gamblingService.connection.state !== HubConnectionState.Connected) {
      gamblingService.connection.start().then(() => {
        gamblingService.connection.invoke('RegisterConnection')
      })
    } else {
      gamblingService.connection.invoke('RegisterConnection')
    }
    //   })
  }, [])

  const reset = () => {
    setIsEmptyState(true)
    setIsBetPlacedState(false)
    setIsMatchStarted(false)
    setIsMatchEnded(false)

    setBetAmount(10)
    setIsRiseOrFall(null)

    setWinningText('')
    setLosingText('')

    setWon(null)

    setOpponentName('')
    setOpenPrice(0)
    setThreshold(0)
    setCurrentPrice(0)
  }

  const MatchPending = (opponentName) => {
    setIsBetPlacedState(false)
    setIsMatchStarted(true)
    setOpponentName(opponentName)
  }

  const ClickShort = () => {
    if (!isValid()) return
    
    setIsRiseOrFall(false)
    gamblingService.placeBet(betAmount, false)
  }

  const ClickLong = () => {
    debugger
    if (!isValid()) return
    
    setIsRiseOrFall(true)
    gamblingService.placeBet(betAmount, true)
  }

  const isValid = () => {
    if (!betAmount || betAmount <= 0) {
      alertService.error('Please choose bet amount')
      return false
    }

    return true;
  }

  const calculateTime = () => {
    return (unix - startUnix) / 1000
  }

  //#region Connections

  const hookOnEvents = () => {
    gamblingService.connection.on('BetPlaced', (message) => {
      setStateInitialized(true)
      setIsEmptyState(false)
      setIsBetPlacedState(true)
      setBetAmount(message.amount)

      setIsRiseOrFall(message.long ? true : false)
      setIsMatchEnded(false)
    })

    // gamblingService.connection.on('MatchPending', (message) => {
    //   MatchPending(message.opponentName)
    // })

    gamblingService.connection.on('MatchStarted', (message) => {
      setStateInitialized(true)

      console.log(message)

      setIsEmptyState(false)
      setBetAmount(message.amount)

      MatchPending(message.opponentName)
      setOpenPrice(message.startPrice)
      setThreshold(message.threshold)
      setTimeThreshold(message.unixThreshold)
      setStartUnix(message.startUnix)

      setIsRiseOrFall(message.isRiseOrFall)

      let msg = message

      start(message.unixThreshold - msg.time)

      // const timerRef = setInterval(() => {
      //   // if (time.getSeconds() < message.unixThreshold) {
      //   //   setTime(new Date())
      //   //   setTimeString(dayjs(time).format('mm:ss'))
      //   // }
      //   let ds = dayjs(startDate).subtract(new Date())

      //   setTimeString(ds.format('mm:ss'))
      // }, 1000)
    })

    gamblingService.connection.on('PriceEvent', (message) => {
      setCurrentPrice(message.currentPrice)
      setUnix(message.currentUnix)

      console.log(timeLeft)
    })

    gamblingService.connection.on('GameEnded', (message) => {
      setStateInitialized(true)

      setIsEmptyState(false)

      setWon(message.won)
      setIsMatchEnded(true)
      setIsMatchStarted(false)

      setIsRiseOrFall(message.isRiseOrFall)
      setBetAmount(message.amount)
      setOpenPrice(message.startPrice)
      setCurrentPrice(message.closePrice)

      setTime(new Date(0))

      setTimeout(getTableData, 3000)
    })

    gamblingService.connection.on('BalanceUpdated', (message) => {
      setCurrentBalance(message.amount)
    })

    gamblingService.connection.on('CLEAR', () => {
      setStateInitialized(true)
    })
  }

  //#endregion

  if (!stateInitialized) {
    return <Result icon={<Spin size="large" />} title="Connecting..." />
  }

  const handleChange = () => {}

  return (
    <div>
      <Row>
        <Col flex={1}>
          <div className="header-container border-1px-alto">
            <div className="header">HEADER</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col flex={1} style={{ padding: 8 }}>
          <WinningStreak winningStreaks={winningStreaks} />
        </Col>
        <Col flex={6} style={{ paddingBottom: 8, paddingTop: 8 }}>
          <Tabs
            defaultActiveKey="2"
            onChange={(s) => console.log(s)}
            style={{ height: '100%' }}
            type="card">
            <TabPane tab="Chart" key="1">
              <IFrame url={config.iframeUrl} className="chart-iframe" />
            </TabPane>
            <TabPane tab="Battle" key="2">
              <BattleTab
                isEmptyState={isEmptyState}
                isBetPlacedState={isBetPlacedState}
                isMatchStarted={isMatchStarted}
                isMatchEnded={isMatchEnded}
                betAmount={betAmount}
                riseOrFall={isRiseOrFall}
                openPrice={openPrice}
                currentPrice={currentPrice}
                remainingSeconds={Math.round(timeLeft / 1000)}
                threshold={threshold}
                playerName={username}
                opponentName={opponentName}
                isWinner={won}
                onTryAgain={reset}
              />
            </TabPane>
          </Tabs>
        </Col>
        <Col flex={1} style={{ padding: 8 }}>
          <Card
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
            <Statistic
              value={username}
              prefix={<UserOutlined />}
              className="user-title"
            />
            <VerticalSpace />
            <Statistic
              value={`$ ${currentBalance}`}
              prefix={<SnippetsOutlined />}
              className="money"
            />
            <VerticalSpace />
            <Select
              defaultValue="btc"
              onChange={handleChange}
              size="large"
              placeholder="Select currency">
              <Option value="btc">BTC</Option>
              <Option value="eth" disabled>
                ETH
              </Option>
            </Select>
            <VerticalSpace />
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                if (value > 0) setBetAmount(value)
              }}
              value={betAmount}
              step={5}
              disabled={isRiseOrFall !== null}
              size="large"
              style={{ width: '100%' }}
              placeholder="Insert amount (ex. 100$)"
            />
            <VerticalSpace />
            <VerticalSpace />
            <VerticalSpace />
            <VerticalSpace />
            <VerticalSpace />
            <VerticalSpace />
            <BetButtons>
              <BetButton onClick={ClickShort} short title="SHORT" />
              <BetButton onClick={ClickLong} title="LONG" />
            </BetButtons>
            <VerticalSpace />
            <Theme />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>
          <OrderHistory data={orderHistory} />
        </Col>
      </Row>
    </div>
  )
}

const textsWin = ['Impressive, You Won!']

const getWinningText = () =>
  textsWin[Math.floor(Math.random() * textsWin.length)]

export { Gambling }
