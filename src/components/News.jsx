/* eslint-disable @next/next/no-img-element */
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function News() {
  const [news, setNews] = useState([])
  const [articleNum, setArticleNum] = useState(3)

  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/general/gb.json').then(res => res.json()).then(data => setNews(data.articles))

  }, [])

  return (
    <div className="text-gray-700 dark:text-white space-y-3 bg-gray-100 dark:bg-slate-700 rounded-xl overflow-y-auto">
      <h4 className="font-bold text-xl px-4">What &apos; s happening</h4>
      {news.slice(0, articleNum).map((article, index) => (
        <div key={index}>
            <a href={article.url} target="_blank">
              <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all duration-200">
                <div className="space-y-0.5">
                  <h6 className="text-sm font-bold">{article.title}</h6>
                  <p className="text-xs font-normal">{article.source.name}</p>
                </div>
                <img src={article.urlToImage} alt="" width={70} className="rounded-xl"/>
              </div>
            </a>
        </div>
      ))}
      <button
      className="text-blue-300 pl-4 py-2 text-sm hover:text-blue-400"
       onClick={() => setArticleNum(articleNum + 3)}>
        Load more
       </button>
    </div> 
  )
}
