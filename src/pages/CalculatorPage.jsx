import Calculator from "../components/Calculator";

function CalculatorPage({ darkMode = true }) {
    return (
        <div>
            <Calculator darkMode={darkMode} />
        </div>
    )
}

export default CalculatorPage