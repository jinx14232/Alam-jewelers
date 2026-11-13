import { tabsText } from '../Utility.js'

function Tabs(props){
    return(
        <section className='tabs' id='tabs'>
             {props.tabs.map((tab, id) => (
                <button 
                    key={id} 
                    className={"tab" + (tabsText[tab] === props.currentTab ? " on" : "")}
                    onClick={props.handleClick}
                ><a href="#tabs">{tab}</a></button>
          ))}
        </section>
    )
}

export default Tabs