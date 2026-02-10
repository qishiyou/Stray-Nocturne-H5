import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ShieldCheck, ArrowRight, Github, Chrome, CheckCircle2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: any;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      setCountdown(60);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const handleSendCode = () => {
    if (!phone || phone.length < 5) {
      setError('请输入正确的账号/手机号');
      return;
    }
    setError('');
    setIsCounting(true);
    // 模拟发送验证码
    console.log('验证码已发送至:', phone);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('请先阅读并同意用户协议');
      return;
    }
    if (!phone || !code) {
      setError('请完善登录信息');
      return;
    }
    setError('');
    // 模拟登录成功
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8 max-w-md mx-auto relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="flex-1 flex flex-col pt-12 relative z-10">
        {/* 头部欢迎语 */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow">
            <span className="text-white text-2xl font-black italic tracking-tighter">SN</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-2 tracking-tight">欢迎回来</h1>
          <p className="text-gray-400 font-medium">登录以开启 Stray Nocturne 智慧之旅</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          {error && (
            <div className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center animate-shake">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <div className="space-y-4">
            {/* 账号/手机号输入 */}
            <div className="relative group">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="手机号 / 随意数字账号" 
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-secondary"
              />
            </div>

            {/* 验证码输入 */}
            <div className="relative group flex space-x-3">
              <div className="relative flex-1">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="验证码" 
                  maxLength={6}
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-secondary"
                />
              </div>
              <button 
                type="button"
                onClick={handleSendCode}
                disabled={isCounting}
                className={`px-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
                  isCounting 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-primary/10 text-primary hover:bg-primary/20 active:scale-95'
                }`}
              >
                {isCounting ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 协议勾选 */}
          <div className="flex items-start space-x-2 pt-2">
            <button 
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                agreed ? 'bg-primary border-primary' : 'border-gray-200'
              }`}
            >
              {agreed && <CheckCircle2 size={14} className="text-white" />}
            </button>
            <p className="text-xs text-gray-400 leading-relaxed">
              我已阅读并同意 
              <button type="button" className="text-primary font-bold hover:underline mx-1">用户协议</button> 
              和 
              <button type="button" className="text-primary font-bold hover:underline mx-1">隐私政策</button>
            </p>
          </div>

          <button 
            type="submit" 
            className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center group shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
          >
            立即登录 / 注册
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>

        {/* 第三方登录 */}
        <div className="mt-16">
          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-xs text-gray-300 font-bold uppercase tracking-widest">其他登录方式</span>
          </div>

          <div className="flex justify-center space-x-6">
            <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Github size={20} className="text-gray-600" />
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Chrome size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-300">
          Stray Nocturne v1.0.0 © 2026
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
