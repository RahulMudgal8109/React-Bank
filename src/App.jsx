import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CChart } from '@coreui/react-chartjs'
// or

import './App.css'

function App() {
  const [homeValue,setHomeValue]=useState(1000);
  const [downPayment,setDownPayment]=useState(0);
  const [loanAmount,setLoanAmount]=useState(0);
  const [intrestValue,setIntrestValue]=useState(2);
  const [tenure, setTenure] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(()=>{
    let newDownPayment=Math.floor(homeValue*0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homeValue-newDownPayment)

  },[homeValue])

  useEffect(() => {
    const interestPerMonth = intrestValue / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, intrestValue, tenure]);
  return (
    <>
      <div style={{ width: "60vw", display: "flex", justifyContent: "space-between", marginX: "auto" }}>
        <div>
          <div>
            <p>Home Value</p>
            <p>{homeValue}</p>
            <input type="range" min="1000" max="10000" value={homeValue} onChange={(e)=>{
              setHomeValue(e.currentTarget.value)
            }}/>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h6>$1000</h6>
              <h6>$10000</h6>
            </div>
          </div>

          <div>
            <p>Down Payment</p>
            <p>{downPayment}</p>
            <input type="range" min="0" max={homeValue} value={downPayment} onChange={(e)=>{
              setDownPayment(e.currentTarget.value)
              setLoanAmount(homeValue-e.currentTarget.value)
            }}/>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h6>$0</h6>
              <h6>${homeValue}</h6>
            </div>
          </div>

          <div>
            <p>Loan Amount</p>
            <p>{loanAmount}</p>
            <input type="range" min="0" max={homeValue} value={loanAmount} onChange={(e)=>{
              setLoanAmount(e.currentTarget.value)
              setDownPayment(homeValue-e.currentTarget.value);
            }} />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h6>$0</h6>
              <h6>${homeValue}</h6>
            </div>
          </div>

          

          <div>
            <p>Tenure</p>
            <p>{tenure+" "+"years"}</p>
           
            

<select name="tenure" id="tenure" style={{width:"100%"}} value={tenure} onChange={(e)=>{
  setTenure(e.currentTarget.value)
}}>
  <option value="5">5 Years</option>
  <option value="10">10 Years</option>
  <option value="15">15 Years</option>
  <option value="20">20 Years</option>
</select>
          </div>
        </div>


        <div style={{ width: "300px" }}>
        <h3>Monthly Payment: $ {Math.floor(monthlyPayment)}</h3>
          <CChart
            type="pie"
            data={{
              labels: ['Principle', 'Intrest'],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651'],
                  data: [homeValue, monthlyPayment * tenure * 12 - loanAmount],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: ('black'),
                  }
                }
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App
