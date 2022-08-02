import React, { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl , sourceNews ,authorName, publishTime} = this.props
        return (
            <div className='container my-5'>
                <div className="card bg-light shadow-sm">
                    <div>
                        <span className="badge rounded-pill bg-primary" style={{position:'absolute',right: '0px'}}><strong>Source:</strong> {sourceNews}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='text-primary'>By-: {!authorName? 'Unknown': authorName} Published at {  new Date(publishTime).toDateString() }</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More.....</a>
                    </div>
                </div>
            </div>
        )
    }
}
