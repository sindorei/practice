
import { ToyReact, Component } from './toy-react'
class MyComponent extends Component {
    render() {
        return <div>
            <span>123</span>
            <span>456</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>
    }
}
let a = <MyComponent name="mycomponent" id="1">
        <div>789</div>
    </MyComponent>


ToyReact.render(a, document.body)