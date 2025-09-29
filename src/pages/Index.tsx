import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Index = () => {
  const [activeTab, setActiveTab] = useState('lotteries');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryDescription, setLotteryDescription] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');
  const [lotteryConditions, setLotteryConditions] = useState('');
  const [endDate, setEndDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const participants = [
    { id: 1, name: 'Алексей Иванов', email: 'alex@example.com', phone: '+7 (999) 123-45-67', tickets: 5, status: 'active', joinedDate: '15.09.2025' },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', phone: '+7 (999) 234-56-78', tickets: 3, status: 'active', joinedDate: '18.09.2025' },
    { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', phone: '+7 (999) 345-67-89', tickets: 8, status: 'winner', joinedDate: '10.09.2025' },
    { id: 4, name: 'Елена Смирнова', email: 'elena@example.com', phone: '+7 (999) 456-78-90', tickets: 2, status: 'active', joinedDate: '20.09.2025' },
    { id: 5, name: 'Игорь Козлов', email: 'igor@example.com', phone: '+7 (999) 567-89-01', tickets: 6, status: 'active', joinedDate: '22.09.2025' },
    { id: 6, name: 'Ольга Морозова', email: 'olga@example.com', phone: '+7 (999) 678-90-12', tickets: 4, status: 'winner', joinedDate: '12.09.2025' },
    { id: 7, name: 'Сергей Волков', email: 'sergey@example.com', phone: '+7 (999) 789-01-23', tickets: 7, status: 'active', joinedDate: '25.09.2025' },
    { id: 8, name: 'Анна Новикова', email: 'anna@example.com', phone: '+7 (999) 890-12-34', tickets: 1, status: 'inactive', joinedDate: '05.09.2025' },
  ];

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         participant.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateLottery = () => {
    console.log({
      name: lotteryName,
      description: lotteryDescription,
      prize: lotteryPrize,
      conditions: lotteryConditions,
      endDate: endDate,
    });
    setIsDialogOpen(false);
    setLotteryName('');
    setLotteryDescription('');
    setLotteryPrize('');
    setLotteryConditions('');
    setEndDate(undefined);
  };

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать лотерею
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">
                    Создание новой лотереи
                  </DialogTitle>
                  <DialogDescription>
                    Заполните информацию о лотерее для её запуска
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">
                      Название лотереи
                    </Label>
                    <Input
                      id="name"
                      placeholder="Например: Новогодний розыгрыш 2026"
                      value={lotteryName}
                      onChange={(e) => setLotteryName(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">
                      Описание
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Краткое описание лотереи и её целей"
                      value={lotteryDescription}
                      onChange={(e) => setLotteryDescription(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prize" className="text-base font-semibold">
                      Главный приз
                    </Label>
                    <Input
                      id="prize"
                      placeholder="Например: iPhone 15 Pro Max"
                      value={lotteryPrize}
                      onChange={(e) => setLotteryPrize(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conditions" className="text-base font-semibold">
                      Условия участия
                    </Label>
                    <Textarea
                      id="conditions"
                      placeholder="Опишите условия и правила участия в лотерее"
                      value={lotteryConditions}
                      onChange={(e) => setLotteryConditions(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Дата окончания</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal"
                        >
                          <Icon name="Calendar" size={18} className="mr-2" />
                          {endDate ? format(endDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 h-12"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleCreateLottery}
                    className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-cyan-500 hover:from-orange-600 hover:to-cyan-600 text-white"
                  >
                    <Icon name="Sparkles" size={18} className="mr-2" />
                    Создать лотерею
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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

        {/* Participants Table */}
        {activeTab === 'participants' && (
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Все участники</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Поиск по имени, email или телефону"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40 h-10">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="winner">Победители</SelectItem>
                    <SelectItem value="inactive">Неактивные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-50 hover:to-gray-50">
                    <TableHead className="font-bold text-gray-900">Имя</TableHead>
                    <TableHead className="font-bold text-gray-900">Email</TableHead>
                    <TableHead className="font-bold text-gray-900">Телефон</TableHead>
                    <TableHead className="font-bold text-gray-900 text-center">Билетов</TableHead>
                    <TableHead className="font-bold text-gray-900">Дата регистрации</TableHead>
                    <TableHead className="font-bold text-gray-900">Статус</TableHead>
                    <TableHead className="font-bold text-gray-900 text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id} className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-cyan-50 transition-all">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{participant.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{participant.email}</TableCell>
                      <TableCell className="text-gray-600">{participant.phone}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          {participant.tickets}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{participant.joinedDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            participant.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : participant.status === 'winner'
                              ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {participant.status === 'active' ? 'Активен' : participant.status === 'winner' ? 'Победитель' : 'Неактивен'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="hover:bg-cyan-50 hover:text-cyan-600">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-orange-50 hover:text-orange-600">
                            <Icon name="Edit" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredParticipants.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Участники не найдены</p>
                <p className="text-gray-400 text-sm mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </Card>
        )}

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