import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Box, User } from 'lucide-react';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Box, label: '设备', path: '/devices' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl">
      {/* Main Content */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
