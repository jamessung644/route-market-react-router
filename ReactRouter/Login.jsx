import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // 1. 로그인 상태를 관리할 State 생성 (기본값은 빈 문자열)
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = () => {
    // 2. 로그인 로직 수행 후, 화면에 보여줄 메시지 상태 업데이트
    setLoginMessage("🎉 로그인에 성공했습니다! 잠시 후 이동합니다.");

    // 3. 메시지를 보여준 후 1.5초(1500ms) 뒤에 페이지 이동
    setTimeout(() => {
      navigate('/'); // 로그인 성공 후 이동할 페이지 경로 
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>로그인 페이지</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleLogin}>로그인하기</button>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
      </div>
      
      <hr />

      {/* 4. 로그인 메시지가 있을 때만 화면 하단에 <p> 태그를 렌더링합니다 */}
      {loginMessage && (
        <p style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#e6f7ff', 
          border: '1px solid #91d5ff', 
          borderRadius: '4px',
          color: '#1890ff',
          fontWeight: 'bold'
        }}>
          {loginMessage}
        </p>
      )}
    </div>
  );
}
