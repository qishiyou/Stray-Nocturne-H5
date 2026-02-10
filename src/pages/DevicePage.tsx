import React, { useState } from 'react';
import { Plus, MoreVertical, Info, RefreshCw, Power, Trash2, Mic, ChevronRight, Signal, Wifi, Battery, Box, X, AlertTriangle, Edit2, UserCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DevicePage: React.FC = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showOTA, setShowOTA] = useState(false);
  const [otaStatus, setOtaStatus] = useState<'checking' | 'ready' | 'downloading' | 'installing' | 'success'>('checking');
  const [otaProgress, setOtaProgress] = useState(0);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    wakeWord: '',
    voice: '甜美女生',
    description: ''
  });

  const [deviceStates, setDeviceStates] = useState({
    1: { volume: 75, mic: true, led: true, firmware: 'v1.2.4', ip: '192.168.1.105', mac: 'AA:BB:CC:DD:EE:FF' },
  });

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: '全息盒子 Pro',
      status: 'online',
      type: 'Pro',
      wakeWord: '你好小蓝',
      voice: '甜美女生',
      description: '一个聪明可爱的 AI 伴侣，喜欢聊天和唱歌。',
      image: 'https://p5-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/76f27f317877473eac24b5066c733280~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202602061253033289E0582724E00D6804&rrcfp=f06b921b&x-expires=1772945598&x-signature=VwXfENQAQ2a41aqRIaa3vbx39Xc%3D',
    },
    {
      id: 2,
      name: '全息盒子 Mini',
      status: 'offline',
      type: 'Mini',
      wakeWord: '嘿小叮当',
      voice: '元气少年',
      description: '充满活力的机器人小伙伴。',
      image: null,
    }
  ]);

  const updateDeviceState = (id: number, key: string, value: any) => {
    setDeviceStates(prev => ({
      ...prev,
      [id]: { ...prev[id as keyof typeof prev], [key]: value }
    }));
  };

  const handleReboot = (_id: number) => {
    setActionLoading('rebooting');
    setShowMenu(null);
    // 模拟重启
    setTimeout(() => {
      setActionLoading(null);
      alert('设备已成功重启');
    }, 2000);
  };

  const handleOffline = (id: number) => {
    setActionLoading('offlining');
    setShowMenu(null);
    // 模拟下线
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'offline' } : d));
      setActionLoading(null);
    }, 1500);
  };

  const handleDelete = (id: number) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    setShowDeleteConfirm(null);
    setShowMenu(null);
  };

  const handleEdit = (device: any) => {
    setSelectedDevice(device);
    setEditForm({
      name: device.name,
      wakeWord: device.wakeWord || '',
      voice: device.voice || '甜美女生',
      description: device.description || ''
    });
    setShowEdit(true);
    setShowMenu(null);
  };

  const handleSaveEdit = () => {
    setActionLoading('saving');
    setShowEdit(false);
    
    // 模拟保存
    setTimeout(() => {
      setDevices(prev => prev.map(d => 
        d.id === selectedDevice.id 
          ? { ...d, ...editForm } 
          : d
      ));
      setActionLoading(null);
    }, 1000);
  };

  const startOTA = (device: any) => {
    setSelectedDevice(device);
    setShowOTA(true);
    setShowMenu(null);
    setOtaStatus('checking');
    setOtaProgress(0);

    // 模拟检测更新
    setTimeout(() => {
      setOtaStatus('ready');
    }, 2000);
  };

  const handleDownload = () => {
    setOtaStatus('downloading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setOtaProgress(100);
        setTimeout(() => {
          setOtaStatus('installing');
          handleInstall();
        }, 1000);
      } else {
        setOtaProgress(Math.floor(progress));
      }
    }, 400);
  };

  const handleInstall = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setOtaProgress(100);
        setTimeout(() => {
          setOtaStatus('success');
          // 更新设备版本
          if (selectedDevice) {
            updateDeviceState(selectedDevice.id, 'firmware', 'v1.3.0');
          }
        }, 1500);
      } else {
        setOtaProgress(Math.floor(progress));
      }
    }, 600);
  };

  return (
    <div className="p-4">
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium">12:30</div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Signal size={16} />
          <Wifi size={16} />
          <Battery size={16} />
        </div>
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-secondary">我的设备</h2>
        <button 
          onClick={() => navigate('/add-device')}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-glow transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Device List */}
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="device-card relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                {device.image ? (
                  <img src={device.image} alt={device.name} className="w-12 h-12 object-contain mr-3" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                    <Box className="text-gray-400" size={24} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-secondary">{device.name}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center mr-3">
                      <span className={`w-2 h-2 rounded-full mr-1 ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {device.status === 'online' ? '在线' : '离线'}
                    </span>
                    {device.status === 'online' && (
                      <span className="flex items-center">
                        <Wifi size={12} className="text-primary mr-1" />
                        <Signal size={12} className="text-primary" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(showMenu === device.id ? null : device.id)}
                  className="text-gray-400 hover:text-primary transition-colors relative z-[60]"
                >
                  <MoreVertical size={20} />
                </button>
                
                {showMenu === device.id && (
                  <>
                    <div 
                      className="fixed inset-0 z-[50]" 
                      onClick={() => setShowMenu(null)}
                    ></div>
                    <div className="absolute right-0 top-8 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 z-[60] overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                      <button 
                        onClick={() => { setSelectedDevice(device); setShowDetail(true); setShowMenu(null); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                      >
                        <Info size={16} className="mr-3 text-primary" /> 设备详情
                      </button>
                      <button 
                        onClick={() => handleEdit(device)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                      >
                        <Edit2 size={16} className="mr-3 text-primary" /> 编辑设备
                      </button>
                      <button 
                        onClick={() => handleReboot(device.id)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                      >
                        <RefreshCw size={16} className="mr-3 text-primary" /> 重启设备
                      </button>
                      <button 
                        onClick={() => startOTA(device)}
                        className={`w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors ${device.status === 'offline' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={device.status === 'offline'}
                      >
                        <RefreshCw size={16} className="mr-3 text-primary animate-spin-slow" /> 固件升级
                      </button>
                      <button 
                        onClick={() => handleOffline(device.id)}
                        className={`w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors ${device.status === 'offline' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={device.status === 'offline'}
                      >
                        <Power size={16} className="mr-3 text-primary" /> 下线设备
                      </button>
                      <div className="h-px bg-gray-100 mx-2"></div>
                      <button 
                        onClick={() => setShowDeleteConfirm(device.id)}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center transition-colors"
                      >
                        <Trash2 size={16} className="mr-3" /> 删除设备
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {device.status === 'online' && deviceStates[device.id as keyof typeof deviceStates] && (
              <div className="space-y-4">
                {/* Volume */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">音量</span>
                    <span className="text-sm text-primary">{deviceStates[device.id as keyof typeof deviceStates].volume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={deviceStates[device.id as keyof typeof deviceStates].volume} 
                    onChange={(e) => updateDeviceState(device.id, 'volume', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
                
                {/* Toggles */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">麦克风</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={deviceStates[device.id as keyof typeof deviceStates].mic} 
                      onChange={(e) => updateDeviceState(device.id, 'mic', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">LED灯效</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={deviceStates[device.id as keyof typeof deviceStates].led} 
                      onChange={(e) => updateDeviceState(device.id, 'led', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}
            
            {device.status === 'offline' && (
              <div className="flex justify-end">
                <ChevronRight className="text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Device Detail Modal */}
      {showDetail && selectedDevice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetail(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary">设备详情</h3>
                <button onClick={() => setShowDetail(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-light rounded-3xl flex items-center justify-center mb-4">
                  {selectedDevice.image ? (
                    <img src={selectedDevice.image} alt={selectedDevice.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <Box size={48} className="text-gray-300" />
                  )}
                </div>
                <h4 className="text-lg font-bold text-secondary">{selectedDevice.name}</h4>
                <div className="flex items-center mt-1">
                  <span className={`w-2 h-2 rounded-full mr-2 ${selectedDevice.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-sm text-gray-500">{selectedDevice.status === 'online' ? '在线' : '离线'}</span>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-6 rounded-3xl">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">设备型号</span>
                  <span className="font-medium text-secondary">{selectedDevice.type === 'Pro' ? '全息盒子 Pro (旗舰版)' : '全息盒子 Mini (便携版)'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">固件版本</span>
                  <span className="font-medium text-secondary">{deviceStates[selectedDevice.id as keyof typeof deviceStates]?.firmware || 'v1.0.0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">IP 地址</span>
                  <span className="font-medium text-secondary">{deviceStates[selectedDevice.id as keyof typeof deviceStates]?.ip || '192.168.1.1'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">MAC 地址</span>
                  <span className="font-medium text-secondary tracking-wider">{deviceStates[selectedDevice.id as keyof typeof deviceStates]?.mac || '00:00:00:00:00:00'}</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50/50 border-t border-gray-100">
              <button 
                onClick={() => setShowDetail(false)}
                className="btn-primary w-full py-4 rounded-2xl"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Device Modal */}
      {showEdit && selectedDevice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEdit(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-300">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary">编辑设备</h3>
                <button onClick={() => setShowEdit(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Device Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">设备名称</label>
                  <div className="relative group">
                    <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="例如：客厅的盒子" 
                      className="input-field input-with-icon bg-gray-50 border-transparent focus:bg-white"
                    />
                  </div>
                </div>

                {/* Wake Word */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">唤醒词</label>
                  <div className="relative group">
                    <Mic className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={editForm.wakeWord}
                      onChange={(e) => setEditForm({ ...editForm, wakeWord: e.target.value })}
                      placeholder="例如：你好小蓝" 
                      className="input-field input-with-icon bg-gray-50 border-transparent focus:bg-white"
                    />
                  </div>
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">角色音色</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['甜美女生', '元气少年', '温柔大叔', '软萌萝莉'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setEditForm({ ...editForm, voice: v })}
                        className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all border-2 ${
                          editForm.voice === v 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-gray-100 text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">角色介绍</label>
                  <div className="relative group">
                    <UserCircle className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <textarea 
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="描述一下您的宠物角色..." 
                      rows={3}
                      className="input-field input-with-icon pt-3 bg-gray-50 border-transparent focus:bg-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => setShowEdit(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleSaveEdit}
                className="flex-[2] btn-primary py-4 rounded-2xl shadow-lg shadow-primary/20"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}></div>
          <div className="bg-white w-full max-w-xs rounded-[2rem] p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">删除设备？</h3>
              <p className="text-sm text-gray-500 mb-8">删除后该设备将无法在此 App 中管理，需重新配网添加。</p>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="py-3 px-4 rounded-xl border border-gray-100 font-bold text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="py-3 px-4 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTA Update Modal */}
      {showOTA && selectedDevice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => otaStatus === 'success' || otaStatus === 'ready' ? setShowOTA(false) : null}></div>
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-secondary">固件升级</h3>
                {(otaStatus === 'ready' || otaStatus === 'success') && (
                  <button onClick={() => setShowOTA(false)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center text-center">
                {otaStatus === 'checking' && (
                  <div className="py-10 flex flex-col items-center">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
                    <h4 className="text-lg font-bold text-secondary mb-2">正在检测更新...</h4>
                    <p className="text-sm text-gray-400">请确保设备网络连接正常</p>
                  </div>
                )}

                {otaStatus === 'ready' && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                      <RefreshCw size={40} className="text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-secondary mb-2">发现新版本 v1.3.0</h4>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed px-4">
                      更新内容：<br/>
                      1. 优化语音识别准确度<br/>
                      2. 修复已知的系统稳定性问题<br/>
                      3. 提升 LED 灯效平滑度
                    </p>
                    <button 
                      onClick={handleDownload}
                      className="btn-primary w-full py-4 rounded-2xl shadow-lg shadow-primary/20"
                    >
                      立即升级
                    </button>
                  </div>
                )}

                {(otaStatus === 'downloading' || otaStatus === 'installing') && (
                  <div className="w-full py-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-8">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                        <circle className="text-primary stroke-current transition-all duration-300 ease-out" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * otaProgress) / 100} transform="rotate(-90 50 50)"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">{otaProgress}%</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-secondary mb-2">
                      {otaStatus === 'downloading' ? '正在下载更新包...' : '正在安装固件...'}
                    </h4>
                    <p className="text-sm text-gray-400">升级期间请勿关闭设备电源</p>
                  </div>
                )}

                {otaStatus === 'success' && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h4 className="text-lg font-bold text-secondary mb-2">升级成功</h4>
                    <p className="text-sm text-gray-400 mb-8">您的设备已升级至最新版本 v1.3.0</p>
                    <button 
                      onClick={() => setShowOTA(false)}
                      className="btn-primary w-full py-4 rounded-2xl"
                    >
                      完成
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Loading Overlay */}
      {actionLoading && (
        <div className="fixed inset-0 z-[110] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw size={24} className="text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-bold text-secondary animate-pulse">
            {actionLoading === 'rebooting' ? '正在重启设备...' : 
             actionLoading === 'offlining' ? '正在下线设备...' : 
             actionLoading === 'saving' ? '正在保存修改...' : '请稍候...'}
          </p>
          <p className="text-sm text-gray-400 mt-2">请稍候，这可能需要几秒钟</p>
        </div>
      )}
    </div>
  );
};

export default DevicePage;
