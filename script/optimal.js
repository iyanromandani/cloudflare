document.addEventListener('DOMContentLoaded', function() {
    const shareBar = document.getElementById('article-share-bar');
    const postContent = document.querySelector('.post-content');
    const article = document.querySelector('article');
    
    if (!shareBar || !postContent || !article) return;
    
    const showThreshold = 300;
    let isSticky = false;
    let isVisible = false;
    let ticking = false;
    
    function updateShareBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const articleRect = article.getBoundingClientRect();
        const articleTop = articleRect.top + scrollTop;
        const articleBottom = articleRect.bottom + scrollTop;
        const viewportHeight = window.innerHeight;
        
        const shouldBeSticky = scrollTop > showThreshold && 
                              scrollTop < (articleBottom - viewportHeight + 100);
        
        const shouldBeVisible = shouldBeSticky;
        
        if (shouldBeSticky !== isSticky) {
            isSticky = shouldBeSticky;
            shareBar.classList.toggle('sticky-mode', isSticky);
        }
        
        if (shouldBeVisible !== isVisible) {
            isVisible = shouldBeVisible;
            shareBar.classList.toggle('visible', isVisible);
        }
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateShareBar);
            ticking = true;
        }
    }
    
    shareBar.classList.add('sticky-share-bar');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateShareBar, { passive: true });
    
    updateShareBar();
});
