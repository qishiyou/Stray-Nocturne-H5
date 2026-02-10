import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Grid, List as ListIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAssetsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const assets = [
    { id: 1, name: '哈士奇-皮皮', type: '3D模型', date: '2024-02-08', status: '已部署', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: '布偶猫-雪儿', type: '2D立绘', date: '2024-02-05', status: '创作中', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: '小恐龙-阿呆', type: '像素画', date: '2024-02-01', status: '已归档', image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: '柴犬-丸子', type: '3D模型', date: '2024-01-28', status: '已部署', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-500 mr-4 p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-secondary">我的素材</h2>
        </div>
        <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Plus size={24} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索素材名称..." 
            className="w-full bg-white border-none rounded-2xl py-3 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
          <Filter size={20} />
        </button>
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm"
        >
          {viewMode === 'grid' ? <ListIcon size={20} /> : <Grid size={20} />}
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['全部', '3D模型', '2D立绘', '语音包', '场景背景'].map((cat, i) => (
          <button 
            key={cat} 
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${
              i === 0 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Assets Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={asset.image} 
                  alt={asset.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg text-[10px] text-white">
                  {asset.type}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-secondary text-sm mb-1 truncate">{asset.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{asset.date}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    asset.status === '已部署' ? 'bg-green-50 text-green-500' : 
                    asset.status === '创作中' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {asset.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <img src={asset.image} alt={asset.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-secondary text-sm truncate">{asset.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] text-gray-400">{asset.type}</span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400">{asset.date}</span>
                </div>
              </div>
              <div className={`text-[10px] px-2 py-1 rounded-full ${
                asset.status === '已部署' ? 'bg-green-50 text-green-500' : 
                asset.status === '创作中' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-400'
              }`}>
                {asset.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAssetsPage;
