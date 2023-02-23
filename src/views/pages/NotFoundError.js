import Component from "@/core/Component";
import Title from "@components/Title/index.js";
import SearchListWrap from "@components/SearchListWrap";

export default class NotFoundError extends Component {
    template(){
        return `
            <div>
                <h1>404 : Not Found Error</h1>>
            </div>
        `
    }
}