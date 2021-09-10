const { getNewsFromSources, getTopHeadLines } = require('../services/news-service')
exports.getNewsFromSourcesHandler = async (req, res, next) => {
    let { search, page } = req.query

    try {
        if (!page)
            page = 1

        if (!search) {
            let headlines = await getTopHeadLines(page)
            return res.status(200).json(headlines)
        }
        let search_news = await getNewsFromSources(search,page)
        return res.status(200).json(search_news)
    }catch(err){
        console.log(err)
        return next(err)
    }
    

}

