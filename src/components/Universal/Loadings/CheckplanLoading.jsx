import Lottie from 'lottie-react'
import SCAN from '../../../../public/animations/scan.json'
import { FadeLoader } from 'react-spinners'
export default function CheckplanLoading() {
  return (
    <div className="loadings">
      <FadeLoader color="#FFF" />
    </div>
  )
}
