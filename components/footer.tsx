const Footer = () => {
  return (
    <div className="flex flex-col items-center mt-16 mb-6 text-sm">
      <span className="font-medium">
        Powered by <a href="https://nextjs.org/" className="text-primary">Next.js</a> & <a href="https://hexo.io/" className="text-primary">Hexo</a> • Deployed on <a href="https://vercel.com/" className="text-primary">Vercel</a>
      </span>
      <div className="mt-2 opacity-50">
        &copy;{new Date().getFullYear()}&nbsp;GeeKaven
      </div>
    </div>
  )
}

export default Footer