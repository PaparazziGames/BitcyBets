import React from 'react';

const periods = [
    {type: '5 minutes', active: true},
    {type: '10 minutes', active: false},
    {type: '20 minutes', active: false},
    {type: 'Hour', active: false},
    {type: 'Day', active: false},
];

class SelectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showSelectList: false};
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow(e) {
        this.setState(state => ({showSelectList: !state.showSelectList}));
        periods.forEach(period => {
            period.active = period.type === e.target.textContent;
        })
    }

    render() {
        if (this.state.showSelectList) {
            return (
                <div>
                    <ul className="select-list">
                        {periods.map((period, index) => (
                            <li key={index} onClick={this.toggleShow}
                                className={period.active ? 'active' : ''}><span>{period.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <ul className="select-list hide">
                        {periods.filter(period => period.active === true).map((period, index) => (
                            <li key={index} onClick={this.toggleShow}
                                className={period.active ? 'active down' : ''}><span>{period.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };
}

export default SelectList;
