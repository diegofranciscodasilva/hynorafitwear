/* =========================================================
   INTERAÇÕES JS
   ========================================================= */
/* ---------- Modal de detalhes do produto ---------- */
const productModal = document.getElementById('productModal')
const modalImg = document.getElementById('productModalImg')
const modalTitle = document.getElementById('productModalTitle')
const modalCategory = document.getElementById('productModalCategory')
const modalDesc = document.getElementById('productModalDesc')
const modalWhatsapp = document.getElementById('productModalWhatsapp')

const WHATSAPP_NUMBER = 5519989291837 // ex: 5511999999999

const openProductModal = (trigger) => {
    const card = trigger.closest('.product-card')
    const name = card.querySelector('.product-card__name').textContent.trim()
    const img = card.querySelector('.product-card__media img')
    const category = card.dataset.category || ''
    const desc = trigger.dataset.desc || ''

    modalImg.src = img.src
    modalImg.alt = img.alt
    modalTitle.textContent = name
    modalCategory.textContent = category.toUpperCase()
    modalDesc.textContent = desc

    const message = encodeURIComponent(`Olá! Tenho interesse no produto "${name}" da Hynora Fitwear. Poderia me passar mais informações e o valor?`)
    modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

    productModal.classList.add('is-open')
    productModal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('modal-open')
}

const closeProductModal = () => {
    productModal.classList.remove('is-open')
    productModal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('modal-open')
}

document.querySelectorAll('.js-product-details').forEach(trigger => {
    trigger.addEventListener('click', () => openProductModal(trigger))
})

document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeProductModal)
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('is-open')) {
        closeProductModal()
    }
})

document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('is-selected'))
        chip.classList.add('is-selected')
    })
})

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Menu mobile (hambúrguer) ---------- */
    const menuToggle = document.getElementById('menuToggle')
    const mobileNav = document.getElementById('mobileNav')

    const closeMobileNav = () => {
        menuToggle.classList.remove('is-active')
        mobileNav.classList.remove('is-open')
        menuToggle.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('is-open')
        menuToggle.classList.toggle('is-active', isOpen)
        menuToggle.setAttribute('aria-expanded', String(isOpen))
        document.body.style.overflow = isOpen ? 'hidden' : ''
    })

    document.querySelector('.mobile-nav__cta')?.addEventListener('click', closeMobileNav)

    /* ---------- Navegação: estado ativo sincronizado com o scroll ---------- */
    const allNavLinks = document.querySelectorAll('[data-nav-link]')
    const sections = Array.from(document.querySelectorAll('main section[id]'))

    const setActiveNav = (sectionId) => {
        allNavLinks.forEach(link => {
            const isMatch = link.dataset.section === sectionId
            link.classList.toggle('nav__link--active', isMatch)
        })
    }

    // Ao clicar, ativa imediatamente o link (feedback instantâneo antes do scroll suave)
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveNav(link.dataset.section)
            closeMobileNav()
        })
    })

    // Scroll spy: detecta qual seção está visível e atualiza o link ativo automaticamente
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id === 'colecao-masculina'
                        ? 'colecao'
                        : entry.target.id
                    setActiveNav(sectionId)
                }
            })
        },
        {
            // Considera "ativa" a seção que ocupa a faixa central da tela
            rootMargin: '-40% 0px -50% 0px',
            threshold: 0
        }
    )

    sections.forEach(section => observer.observe(section))


    /* ---------- Filtro de produtos (Coleção Origin) ---------- */
    const collections = document.querySelectorAll('.collection')

    collections.forEach(collection => {
        const tabs = collection.querySelectorAll('.tab')
        const productCards = collection.querySelectorAll('.product-card')
        const emptyState = collection.querySelector('.empty-state')

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.filter

                tabs.forEach(t => t.classList.remove('tab--active'))
                tab.classList.add('tab--active')

                let visibleCount = 0
                productCards.forEach(card => {
                    const match = card.dataset.category === filter
                    card.style.display = match ? '' : 'none'
                    if (match) visibleCount++
                })

                emptyState.hidden = visibleCount > 0
            })
        })
    })

    /* ---------- Accordion FAQ ---------- */
    const accordionTriggers = document.querySelectorAll('.accordion__trigger')

    accordionTriggers.forEach(trigger => {
        const panel = trigger.nextElementSibling
        const icon = trigger.querySelector('.accordion__icon')

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true'

            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherTrigger.nextElementSibling.style.maxHeight = null
                    otherTrigger.nextElementSibling.style.opacity = 0
                    otherTrigger.querySelector('.accordion__icon').textContent = 'add'
                }
            })

            trigger.setAttribute('aria-expanded', String(!isOpen))
            icon.textContent = isOpen ? 'add' : 'remove'

            if (!isOpen) {
                panel.style.maxHeight = panel.scrollHeight + 'px'
                panel.style.opacity = 1
            } else {
                panel.style.maxHeight = null
                panel.style.opacity = 0
            }
        })
    })

    /* ---------- Ano atual no footer ---------- */
    const currentYearEl = document.getElementById('currentYear')
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear()
    }

    /* ---------- Header: leve mudança de fundo ao rolar ---------- */
    const header = document.getElementById('header')

    /* ---------- Botão Scroll to Top ---------- */
    const scrollTopBtn = document.getElementById('scrollTop')

    window.addEventListener('scroll', () => {
        // Fundo do header
        header.style.background = window.scrollY > 40
            ? 'rgba(13, 14, 15, 0.95)'
            : 'rgba(18, 20, 20, 0.85)'

        // Exibe o botão de voltar ao topo após rolar 400px
        scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400)
    })

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

})
