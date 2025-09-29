import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeTab, setActiveTab] = useState('lotteries');

  const stats = [
    { label: 'Активных лотерей', value: '12', change: '+3', icon: 'Ticket' },
    { label: 'Всего участников', value: '1,847', change: '+127', icon: 'Users' },
    { label: 'Выдано билетов', value: '3,524', change: '+412', icon: 'Receipt' },
    { label: 'Разыграно призов', value: '156', change: '+8', icon: 'Trophy' },
  ];

  const menuItems = [
    { id: 'lotteries', label: 'Лотереи', icon: 'Ticket', color: 'from-orange-500 to-orange-600' },
    { id: 'participants', label: 'Участники', icon: 'Users', color: 'from-cyan-500 to-cyan-600' },
    { id: 'tickets', label: 'Билеты', icon: 'Receipt', color: 'from-yellow-500 to-yellow-600' },
    { id: 'prizes', label: 'Призы', icon: 'Trophy', color: 'from-orange-400 to-pink-500' },
    { id: 'receipts', label: 'Чеки', icon: 'FileText', color: 'from-purple-500 to-indigo-600' },
  ];

  const recentLotteries = [
    { id: 1, name: 'Новогодний розыгрыш 2025', participants: 523, status: 'active', endDate: '31.12.2025' },
    { id: 2, name: 'Летняя распродажа', participants: 341, status: 'active', endDate: '15.08.2025' },
    { id: 3, name: 'Черная пятница', participants: 892, status: 'completed', endDate: '29.11.2024' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">
                  Lottery Admin
                </h1>
                <p className="text-sm text-gray-500">Панель управления лотереями</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать лотерею
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in border-0 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                    {stat.change} за месяц
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Icon name={stat.icon as any} size={24} className="text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <Card
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 animate-scale-in ${
                activeTab === item.id ? 'ring-2 ring-orange-500' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon name={item.icon as any} size={32} className="text-white" />
              </div>
              <h3 className="text-center font-semibold text-gray-900">{item.label}</h3>
            </Card>
          ))}
        </div>

        {/* Recent Lotteries */}
        <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Недавние лотереи</h2>
            </div>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              Смотреть все
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentLotteries.map((lottery, index) => (
              <div
                key={lottery.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-orange-50 hover:to-cyan-50 transition-all duration-300 border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-cyan-400 rounded-xl flex items-center justify-center">
                    <Icon name="Sparkles" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lottery.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Icon name="Users" size={14} className="mr-1" />
                        {lottery.participants} участников
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        до {lottery.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    className={`${
                      lottery.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {lottery.status === 'active' ? 'Активна' : 'Завершена'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50 hover:text-orange-600">
                    <Icon name="Eye" size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;