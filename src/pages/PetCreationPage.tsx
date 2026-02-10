import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, Video, Wand2, Check, Loader2 } from 'lucide-react';

const PetCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState<'cat' | 'dog' | 'other' | null>(null);
  const [mediaUploaded, setMediaUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startGeneration = () => {
    setStep(3);
    setIsGenerating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 100);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-secondary">创建宠物</h2>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center mb-10 px-4">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div className={`h-full bg-primary transition-all duration-300 ${step > s ? 'w-full' : 'w-0'}`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-lg font-semibold mb-6">您想创建什么样的宠物？</h3>
            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { id: 'cat', label: '猫咪', icon: '🐱' },
                { id: 'dog', label: '狗狗', icon: '🐶' },
                { id: 'bird', label: '小鸟', icon: '🐦' },
                { id: 'other', label: '其他', icon: '✨' },
              ].map((type) => (
                <div 
                  key={type.id}
                  onClick={() => setPetType(type.id as any)}
                  className={`p-6 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                    petType === type.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <span className="font-medium">{type.label}</span>
                </div>
              ))}
            </div>
            <button 
              disabled={!petType}
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              下一步
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h3 className="text-lg font-semibold mb-2">上传素材</h3>
            <p className="text-sm text-gray-500 mb-6">上传宠物的照片或视频，AI将根据素材生成形象</p>
            
            <div 
              onClick={() => setMediaUploaded(true)}
              className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center mb-8 cursor-pointer transition-all ${
                mediaUploaded ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
              }`}
            >
              {mediaUploaded ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-white" size={32} />
                  </div>
                  <p className="font-medium text-primary">素材已选择</p>
                  <p className="text-xs text-gray-400 mt-1">点击更换</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="text-gray-400" size={32} />
                  </div>
                  <p className="font-medium">点击上传照片/视频</p>
                  <p className="text-xs text-gray-400 mt-1">支持 jpg, png, mp4 (15s内)</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-8">
              <button className="flex-1 btn-secondary py-2 flex items-center justify-center">
                <Image size={18} className="mr-2" /> 照片
              </button>
              <button className="flex-1 btn-secondary py-2 flex items-center justify-center">
                <Video size={18} className="mr-2" /> 视频
              </button>
            </div>

            <button 
              disabled={!mediaUploaded}
              onClick={startGeneration}
              className="btn-primary w-full"
            >
              生成宠物
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                {isGenerating ? (
                  <Loader2 size={40} className="text-primary animate-spin" />
                ) : (
                  <Wand2 size={40} className="text-primary" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {isGenerating ? 'AI 正在生成中...' : '生成成功！'}
              </h3>
              <p className="text-gray-500 mb-8">
                {isGenerating ? '请稍候，我们正在通过深度学习为您构建专属宠物形象' : '您的 AI 宠物已经准备好与您见面了'}
              </p>

              <div className="w-full mb-8">
                <div className="progress-bar mb-2">
                  <div className="progress-value" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>进度</span>
                  <span>{progress}%</span>
                </div>
              </div>

              {!isGenerating && (
                <div className="w-full space-y-4">
                  <div className="w-48 h-48 bg-light rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-primary">
                    <img 
                      src="https://p5-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/76f27f317877473eac24b5066c733280~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202602061253033289E0582724E00D6804&rrcfp=f06b921b&x-expires=1772945598&x-signature=VwXfENQAQ2a41aqRIaa3vbx39Xc%3D" 
                      alt="Generated Pet" 
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <button onClick={() => navigate('/')} className="btn-primary w-full">
                    同步到设备
                  </button>
                  <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    重新生成
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCreationPage;
