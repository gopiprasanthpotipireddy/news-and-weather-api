const axios = require('axios')
const APP_CACHE = require('../config/cache')
const processNewsResponse = (news) => {
    let articles = news.articles.map(article => {
        return { headline: article.title, link: article.url }
    })

    return { count: articles.length, data: articles, totalResults: news.totalResults }
}

const addHeadLinesToCache = async (search, page, headlines) => {
    search = search != null ? search + page : 'headlines' + page
    console.log(search)
    return APP_CACHE.set(search, headlines, 300)
}
const getTopHeadLinesFromCache = async (search, page) => {

    search = search != null ? search + page : 'headlines' + page

    return APP_CACHE.get(search)
}

exports.getNewsFromSources = async (search, page) => {

    try {
        let headlines = await getTopHeadLinesFromCache(search, page)

        if (headlines == undefined) {
            const param_config = {
                url: `${process.env.NEWS_API_URL}/everything?q=${search}&language=en&page=${page}`,
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "X-Api-Key": process.env.NEWS_API_TOKEN,
                }

            }
            const { data } = await axios(param_config)
            headlines = processNewsResponse(data)

            await addHeadLinesToCache(search, page, headlines)

        }

        return headlines

    }
    catch (err) {
        console.log(err)
        throw err
    }
}

exports.getTopHeadLines = async (page) => {

    try {
        let headlines = await getTopHeadLinesFromCache(null, page)

        if (headlines == undefined) {
            const param_config = {
                url: `${process.env.NEWS_API_URL}/top-headlines?language=en&page=${page}`,
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "X-Api-Key": process.env.NEWS_API_TOKEN,
                }
            }
            const { data } = await axios(param_config)
            headlines = processNewsResponse(data)
            await addHeadLinesToCache(null, page, headlines)
        }


        return headlines
    }
    catch (err) {
        console.log(err)
        throw err
    }
}