import Lottie from 'lottie-react'
import SCAN from '../../../../public/animations/scan.json'
export default function CheckplanLoading() {
  return (
    <div className="loadings">
      <div className="wrapper">
        <Lottie className="lottie" animationData={SCAN} loop={true} />
        <h1>Aguarde...</h1>
        <p>Estamos verificando seu plano de acesso</p>
      </div>
    </div>
  )
}
