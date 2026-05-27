import { useMemo, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { formatPrice, products } from './data/products.js';

function Header({ cartCount }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Route Market home">
        <span className="brand-mark">R</span>
        <span>Route Market</span>
      </Link>
      <nav className="nav-links" aria-label="main navigation">
        <NavLink to="/">홈</NavLink>
        <NavLink to="/products">상품</NavLink>
        <NavLink to="/cart">장바구니</NavLink>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/report">보고서</NavLink>
      </nav>
      <Link to="/cart" className="cart-chip" aria-label={`장바구니 상품 ${cartCount}개`}>
        {cartCount}
      </Link>
    </header>
  );
}

function Home({ onAddToCart }) {
  const featured = products.slice(0, 6);

  const styleItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', user: '@style_king' },
    { id: 2, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', user: '@street_queen' },
    { id: 3, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', user: '@fashion_lover' },
    { id: 4, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', user: '@korean_street' },
    { id: 5, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80', user: '@daily_look' }
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Premium Selection</p>
          <h1>
            당신의 일상을 <em>특별하게</em>
            <br />만들어줄 라이프스타일
          </h1>
          <p>
            엄선된 프리미엄 브랜드와 고품질 아이템으로 당신의 공간과 일상을 새롭게 디자인하세요.
            가치 있는 소비를 제안합니다.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              쇼핑 시작하기
            </Link>
            <Link to="/report" className="ghost-button">
              제작 보고서
            </Link>
          </div>
        </div>
        <div className="hero-product" aria-label="대표 상품">
          <img src={products[0].image} alt={products[0].name} />
          <div>
            <strong>{products[0].name}</strong>
            <span>{formatPrice(products[0].price)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2>인기 상품</h2>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className="more-button-container">
          <Link to="/products" className="more-button">더보기</Link>
        </div>
      </section>

      <section className="section style-section">
        <div className="section-heading">
          <p className="eyebrow">Style Look</p>
          <h2>고객 스타일 추천</h2>
        </div>
        <div className="style-grid">
          {styleItems.map((item) => (
            <div key={item.id} className="style-card">
              <img src={item.image} alt="고객 스타일 추천" />
              <div className="style-overlay">
                <span>{item.user}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductsPage({ onAddToCart }) {
  return (
    <main className="section page">
      <div className="section-heading">
        <p className="eyebrow">Products</p>
        <h1>전체 상품</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </main>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <p className="product-brand">{product.badge || 'Select'}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-row">
          {product.discount && <span className="product-discount">{product.discount}%</span>}
          <strong className="product-price">{formatPrice(product.price)}</strong>
        </div>
      </div>
      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="small-link">
          상세 보기
        </Link>
        <button type="button" onClick={() => onAddToCart(product)}>
          담기
        </button>
      </div>
    </article>
  );
}

function ProductDetail({ onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main className="detail-page">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        뒤로 가기
      </button>
      <section className="detail-layout">
        <img src={product.image} alt={product.name} />
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <strong className="detail-price">{formatPrice(product.price)}</strong>
          <p>{product.description}</p>
          <div className="detail-actions">
            <button type="button" onClick={() => onAddToCart(product)}>
              장바구니 담기
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate('/cart')}>
              장바구니 이동
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function CartPage({ cartItems, onRemoveFromCart, totalPrice }) {
  const navigate = useNavigate();

  return (
    <main className="section page">
      <div className="section-heading">
        <p className="eyebrow">Cart</p>
        <h1>장바구니</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h2>아직 담긴 상품이 없습니다</h2>
          <button type="button" onClick={() => navigate('/products')}>
            상품 보러 가기
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.cartId}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.category}</p>
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <button type="button" onClick={() => onRemoveFromCart(item.cartId)}>
                  삭제
                </button>
              </article>
            ))}
          </div>
          <aside className="checkout-panel">
            <span>총 결제 금액</span>
            <strong>{formatPrice(totalPrice)}</strong>
            <button type="button" onClick={() => navigate('/login')}>
              로그인 후 결제
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

function LoginPage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setMessage('로그인에 성공했습니다. 홈으로 이동합니다.');
    window.setTimeout(() => navigate('/'), 1000);
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">Login</p>
        <h1>회원 로그인</h1>
        <label>
          아이디
          <input type="text" placeholder="route-user" />
        </label>
        <label>
          비밀번호
          <input type="password" placeholder="password" />
        </label>
        <div className="auth-actions">
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
          <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
            뒤로
          </button>
        </div>
        {message && <p className="success-message">{message}</p>}
      </section>
    </main>
  );
}

function ReportPage() {
  const prompts = [
    {
      step: '01',
      text: 'React Router로 다중 페이지 라우팅 되는 간단한 쇼핑몰 만들어줘. 메인/상품상세/장바구니/보고서 페이지로 구성하고, 최종적으로 GitHub repo에 푸시할 거니까 폴더 구조 깔끔하게 잡아줘.',
      result: '프로젝트 초기 구조 점검 후 React Router 기반 쇼핑몰 화면과 보고서 페이지를 구성.',
    },
    {
      step: '02',
      text: 'npm run dev 돌렸는데 화면이 백지로만 떠. 콘솔 에러랑 Vite 빌드 설정 한번 점검해줄래?',
      result: 'vite.config.js 부재가 원인임을 진단. @vitejs/plugin-react를 등록한 설정 파일을 생성하여 JSX 변환 문제 해결.',
    },
    {
      step: '03',
      text: 'ReportPage 컴포넌트에 이번 프로젝트 전체 개발 보고서 작성해줘. 개요·환경·라우팅·기능·API·디자인·상태관리·한계·회고 섹션으로 나눠서, 인라인 code 스타일이랑 라우트 구성표도 같이 넣어줘.',
      result: 'ReportPage를 10개 섹션(개요·환경·라우팅·라우트표·기능·API·디자인·상태관리·한계·회고)으로 구성. 라우트 구성표 컴포넌트와 인라인 code 스타일 추가.',
    },
    {
      step: '04',
      text: '보고서에 내가 그동안 던진 프롬프트랑 그에 따른 작업 결과를 타임라인 형태로 정리해서 추가해줘. 개발 흐름이 한눈에 보이게.',
      result: '본 섹션을 추가하여 개발 과정에서 사용한 프롬프트와 그에 따른 작업 결과를 타임라인 형태로 문서화.',
    },
    {
      step: '05',
      text: '코드랑 보고서에서 특정 서비스/브랜드명 직접 언급한 부분 다 걸러내고, 일반적인 표현(예: \'쇼핑몰\', \'레퍼런스 사이트\')으로 바꿔줘.',
      result: '특정 서비스명으로 보이는 문구를 제거하고 일반 쇼핑몰 표현으로 수정.',
    },
    {
      step: '06',
      text: '상품 데이터가 너무 빈약해. 10종 이상으로 늘리고 진짜 프리미엄 쇼핑몰처럼 보이게 디자인 전면 개편해줘. 폰트는 Inter 같은 모던한 거 쓰고, 헤더 글래스모피즘 + 카드 호버 애니메이션까지 적용.',
      result: 'MacBook Pro, Sony 헤드폰, 이솝 등 10종의 다양한 프리미엄 라이프스타일 상품군을 대거 추가하고, Inter 폰트, 글래스모피즘 헤더, 호버 애니메이션 등 전체적인 디자인을 고품격 스타일로 전면 개편했습니다.',
    },
    {
      step: '07',
      text: '메인 추천 상품 3개는 너무 적어. 최소 6개 이상 노출되도록 늘리고, 데이터도 아이패드·에어팟·프리미엄 가전·패션 소품 등 카테고리 다양하게 10종 추가해줘.',
      result: '메인 홈 화면의 추천 상품 노출 개수를 3개에서 6개로 확대하고, 아이패드 프로 M4, 에어팟 프로 2, LG 스탠바이미 등 인기 프리미엄 가전 및 패션 소품 10종을 추가하여 풍부한 상품군을 확보했습니다.',
    },
    {
      step: '08',
      text: '실제 인기 쇼핑몰 톤 참고해서, 스니커즈·스트릿웨어·명품 가방·주얼리 카테고리별로 잘 팔리는 인기 상품 데이터 더 확장해줘.',
      result: '인기 카테고리(스니커즈, 스트릿웨어, 명품 가방, 주얼리)를 참고하여 Travis Scott 콜라보 조던, 슈프림 박스로고, 샤넬 클래식 백, 롤렉스 등 다양한 인기 상품군으로 DB를 고도화했습니다.',
    },
    {
      step: '09',
      text: '상품 이미지 깨진 게 꽤 보여. 전체 이미지 URL HTTP 상태 코드 검사하는 자동화 스크립트 짜서 broken 이미지 다 찾아내고, 정상 작동하는 고화질 링크로 일괄 교체해줘.',
      result: '로컬 자동화 스크립트를 작성하여 상품들의 이미지 Unsplash URL에 대해 HTTP 상태 코드 검사를 수행하고, 6개의 broken 이미지(404 에러)를 검출 및 100% 정상 작동하는 새로운 고화질 이미지 링크로 전원 수정하였습니다.',
    },
    {
      step: '10',
      text: '담기 버튼 눌러도 UX 피드백이 없어. 우측 하단에 글래스모피즘 토스트 알림 띄우고, [이동] 버튼 누르면 곧바로 장바구니 페이지로 라우팅 되게 해줘.',
      result: '담기 클릭 시 화면 우측 하단에 부드럽게 팝업되는 글래스모피즘 스타일의 \'장바구니 추가 알림 토스트창\'을 구현하고, [이동] 버튼 클릭 시 곧바로 장바구니로 전환하도록 설계하여 편의성을 대폭 향상했습니다.',
    },
    {
      step: '11',
      text: '첨부한 스크린샷처럼 극미니멀 플랫 디자인으로 전면 리뉴얼해줘. 카드 테두리·섀도우 다 빼고, 이미지 컨테이너는 연한 그레이, 할인율은 빨간색, 가격은 볼드체. 홈 하단엔 5열 반응형 스타일 피드 그리드랑 \'더보기\' 버튼도 같이.',
      result: '극미니멀리즘 플랫 디자인을 적용했습니다. 테두리와 섀도우를 줄인 플랫 카드, 연한 그레이 이미지 컨테이너, 빨간색 할인율(%) 및 볼드체 가격 표기를 적용하고, 홈 하단에 5열 반응형 스타일 피드 그리드 및 더보기 버튼을 구현했습니다.',
    },
  ];

  const routes = [
    { path: '/', name: '홈', desc: '히어로 영역 + 추천 상품 6종 노출' },
    { path: '/products', name: '상품 목록', desc: '전체 상품 카드 그리드' },
    { path: '/products/:productId', name: '상품 상세', desc: '동적 URL 파라미터로 상품 식별' },
    { path: '/cart', name: '장바구니', desc: '담은 상품 리스트, 총 금액, 결제 이동' },
    { path: '/login', name: '로그인', desc: '로그인 후 useNavigate로 홈 이동' },
    { path: '/report', name: '보고서', desc: '본 제작 보고서 페이지' },
    { path: '*', name: '404', desc: 'NotFound 처리 라우트' },
  ];

  return (
    <main className="section page report-page">
      <div className="section-heading">
        <p className="eyebrow">Report</p>
        <h1>제작 보고서</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
          React Router를 활용한 다중 페이지 쇼핑몰 — 설계부터 구현까지
        </p>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
          202310671 AI융합학과 성수한
        </p>
      </div>

      <div className="report-grid">
        <section>
          <h2>1. 프로젝트 개요</h2>
          <p>
            React와 React Router v6를 활용하여 SPA(Single Page Application) 방식의
            쇼핑몰을 제작했습니다. 새로고침 없이 URL을 통한 페이지 전환이
            이루어지며, 홈·상품 목록·상품 상세·장바구니·로그인·보고서 총 6개의
            화면으로 구성됩니다.
          </p>
        </section>

        <section>
          <h2>2. 개발 환경</h2>
          <p>
            <strong>Build Tool</strong> · Vite 6<br />
            <strong>Framework</strong> · React 18<br />
            <strong>Routing</strong> · react-router-dom 6<br />
            <strong>Styling</strong> · 순수 CSS (CSS Variables 기반 디자인 토큰)<br />
            <strong>Language</strong> · JavaScript (JSX)
          </p>
        </section>

        <section>
          <h2>3. 적용한 라우팅 기법</h2>
          <p>
            진입점인 <code>main.jsx</code>에서 <code>BrowserRouter</code>로 앱을
            감싸고, <code>App.jsx</code>에서 <code>Routes</code> /{' '}
            <code>Route</code>로 경로를 선언했습니다. 네비게이션은{' '}
            <code>Link</code>와 활성 상태 표시가 가능한 <code>NavLink</code>를
            사용했고, 상세 페이지는 <code>:productId</code> 동적 세그먼트를{' '}
            <code>useParams</code>로 받아 처리합니다.
          </p>
        </section>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>4. 라우트 구성표</h2>
        <div className="route-table">
          <div className="route-row route-head">
            <span>경로</span>
            <span>페이지</span>
            <span>설명</span>
          </div>
          {routes.map((r) => (
            <div className="route-row" key={r.path}>
              <span><code>{r.path}</code></span>
              <span>{r.name}</span>
              <span>{r.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="report-grid" style={{ marginTop: '3rem' }}>
        <section>
          <h2>5. 주요 기능</h2>
          <p>
            • 상품 카드 그리드와 hover 인터랙션<br />
            • 동적 URL 기반 상품 상세 페이지<br />
            • 장바구니 담기 / 개별 삭제<br />
            • <code>useMemo</code>로 총 결제 금액 자동 계산<br />
            • 로그인 성공 시 <code>useNavigate</code>로 홈 이동<br />
            • 잘못된 상품 ID 접근 시 <code>Navigate</code>로 목록 페이지 리다이렉트<br />
            • <code>*</code> 와일드카드 경로로 404 처리
          </p>
        </section>

        <section>
          <h2>6. 사용한 React Router API</h2>
          <p>
            <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>,{' '}
            <code>Link</code>, <code>NavLink</code>, <code>Navigate</code>,{' '}
            <code>useNavigate</code>, <code>useParams</code> 등 React Router v6의
            핵심 API를 실습 차원에서 두루 사용했습니다.
          </p>
        </section>

        <section>
          <h2>7. 디자인 컨셉</h2>
          <p>
            Inter 폰트 기반의 미니멀한 타이포그래피, 회색 톤의 중성 팔레트,
            CSS Variables로 정의한 디자인 토큰을 사용했습니다. 카드 hover 시
            lift 애니메이션, 이미지 zoom, 페이지 전환 fade-in 효과로 디테일을
            살렸으며, 모바일까지 대응하는 반응형 레이아웃을 적용했습니다.
          </p>
        </section>

        <section>
          <h2>8. 상태 관리</h2>
          <p>
            장바구니는 <code>App</code> 컴포넌트의 <code>useState</code>로 관리하고,
            하위 페이지에는 props로 핸들러를 전달하는 단방향 데이터 흐름을
            유지했습니다. 규모가 작아 Context나 외부 상태 관리 라이브러리는
            도입하지 않았습니다.
          </p>
        </section>

        <section>
          <h2>9. 소감</h2>
          <p>
            React Router의 선언적 라우팅 덕분에 페이지 구조를 명확히 파악할 수
            있었고, <code>useNavigate</code>·<code>useParams</code> 같은 훅을
            직접 사용해보며 SPA에서의 페이지 이동 메커니즘을 익혔습니다.
            컴포넌트 분리와 props 설계의 중요성도 체감할 수 있었던 과제였습니다.
            Github 레포지터리에 프로젝트를 업로드 한뒤, Vercel 에 웹 호스팅을 하여, 전 세계 누구나 접속가능한 링크를 만들 수 있다는 점이 가장 좋았습니다.
          </p>
        </section>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>11. 사용한 프롬프트</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          본 프로젝트는 AI 어시스턴트와의 대화를 통해 진행되었으며, 단계별로
          사용한 프롬프트와 그에 따른 작업 결과는 아래와 같습니다.
        </p>
        <div className="prompt-timeline">
          {prompts.map((p) => (
            <article className="prompt-item" key={p.step}>
              <div className="prompt-step">{p.step}</div>
              <div className="prompt-body">
                <p className="prompt-text">“{p.text}”</p>
                <p className="prompt-result">
                  <strong>→ 작업 결과 ·</strong> {p.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="empty-state page">
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/products" className="primary-button">
        상품 페이지로 이동
      </Link>
    </main>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  const cartCount = cartItems.length;
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  );

  const handleAddToCart = (product) => {
    setCartItems((items) => [...items, { ...product, cartId: crypto.randomUUID() }]);

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    setToast({
      name: product.name,
      image: product.image
    });

    const timeout = setTimeout(() => {
      setToast(null);
    }, 3000);
    setToastTimeoutId(timeout);
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems((items) => items.filter((item) => item.cartId !== cartId));
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
        <Route
          path="/products/:productId"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              totalPrice={totalPrice}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {toast && (
        <div className="toast-notification" role="alert">
          <img src={toast.image} alt={toast.name} className="toast-img" />
          <div className="toast-body">
            <p className="toast-title">장바구니 추가 완료</p>
            <p className="toast-desc">{toast.name}</p>
          </div>
          <div className="toast-actions">
            <button className="toast-btn-go" onClick={() => { navigate('/cart'); setToast(null); }}>
              이동
            </button>
            <button className="toast-btn-close" onClick={() => setToast(null)}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
