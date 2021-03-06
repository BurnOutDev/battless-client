import { Button } from 'antd'

const BetButton = ({ title, short, onClick, ...props }) => (
  <Button
    style={{
      width: '50%',
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: short ? 'var(--red)' : 'var(--green)',
      height: 56,
      fontWeight: 800,
      fontFamily: 'Montserrat',
      fontSize: 21
    }}
    type="primary"
    size="large"
    {...props}
    onClick={onClick}>
    {title}
  </Button>
)

export { BetButton }
