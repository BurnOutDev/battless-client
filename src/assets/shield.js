const Shield = ({ number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24.049"
    height="24.049"
    viewBox="0 0 24.049 24.049"
    style={{verticalAlign: 'middle'}}>
    <g id="Group_1" data-name="Group 1" transform="translate(-1412 -1493.058)">
      <g id="shield-black-18dp" transform="translate(1412 1493.058)">
        <path
          id="Path_1"
          data-name="Path 1"
          d="M0,0H24.049V24.049H0Z"
          fill="none"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M12.018,1,3,5.008V11.02c0,5.561,3.848,10.762,9.018,12.025,5.171-1.263,9.018-6.463,9.018-12.025V5.008Z"
          transform="translate(0.006 0.002)"
          fill="#f5c652"
        />
      </g>
      <text
        id="_1"
        data-name="1"
        transform="translate(1421.333 1509.108)"
        fill="#fff"
        font-size="11"
        font-family="Montserrat-Bold, Montserrat"
        font-weight="700">
        <tspan x="0" y="0">
          {number}
        </tspan>
      </text>
    </g>
  </svg>
)

export default Shield
