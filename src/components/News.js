import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pagesize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super()
        this.state = {
            page: 1,
            articles: [],
            totalResults: 0,
            loading: false,
        }
    }
    newsupdate = async () => {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a89748230c547558e0203e945cd9f36&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.props.setProgress(20);
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(50);
        let parsedata = await data.json();
        this.props.setProgress(0);
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })
        this.props.setProgress(100);
    }
    componentDidMount() {
        this.newsupdate();
    }
    // function for Next or previous data
    // handleNextclick = () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.newsupdate()
    //     // console.log(parsedata)
    // }
    // handlePreviousclick = async () => {
    //     // console.log(parsedata)
    //     this.setState({ page: this.state.page - 1 })
    //     this.newsupdate();
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a89748230c547558e0203e945cd9f36&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedata = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults, loading: false })
    }
    render() {
        return (

            <>
                <h1 className='text-center my-3'>Daily-Dose {this.props.category} Top-Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className='col-md-4'>
                                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:`https://media.istockphoto.com/photos/daily-papers-with-news-on-the-computer-picture-id1301656823?b=1&k=20&m=1301656823&s=170667a&w=0&h=s9IXcVfB151qb7Vb_9uJbl-XDGr2179rHA4ikgpdTUM=`} newsUrl={element.url} sourceNews={element.source.name} authorName={element.author} publishTime={element.publishedAt} />
                            </div>
                        })}
                    </div>
                    </div>
                    {/* Button For Next data Or Previous Data */}
                    {/* <div className='m-3 d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePreviousclick}>&#8592;  Previous</button>
                    <button disabled={this.state.page > Math.ceil(this.state.totalResults / this.props.pagesizes)} type="button" className="btn btn-sm btn-dark" onClick={this.handleNextclick}>Next  &#8594;</button>
                </div> */}
                </InfiniteScroll>
            </>
        )
    }
}
