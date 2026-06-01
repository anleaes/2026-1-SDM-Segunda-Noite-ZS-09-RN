import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import PessoaScreen from '../screens/PessoaScreen';
import ClientesScreen, { Cliente } from '../screens/ClientesScreen';
import CreateClienteScreen from '../screens/CreateClienteScreen';
import EditClienteScreen from '../screens/EditClienteScreen';
import CarteirasScreen, { Carteira } from '../screens/CarteirasScreen';
import CreateCarteiraScreen from '../screens/CreateCarteiraScreen';
import EditCarteiraScreen from '../screens/EditCarteiraScreen';
import FuncionariosScreen, { Funcionario } from '../screens/FuncionariosScreen';
import CreateFuncionarioScreen from '../screens/CreateFuncionarioScreen';
import EditFuncionarioScreen from '../screens/EditFuncionarioScreen';
import AgenciasScreen, { Agencia } from '../screens/AgenciasScreen';
import CreateAgenciaScreen from '../screens/CreateAgenciaScreen';
import EditAgenciaScreen from '../screens/EditAgenciaScreen';
import CategoriasScreen, { Categoria } from '../screens/CategoriasScreen';
import CreateCategoriaScreen from '../screens/CreateCategoriaScreen';
import EditCategoriaScreen from '../screens/EditCategoriaScreen';
import VeiculosScreen, { Veiculo } from '../screens/VeiculosScreen';
import CreateVeiculoScreen from '../screens/CreateVeiculoScreen';
import EditVeiculoScreen from '../screens/EditVeiculoScreen';
import AdicionaisScreen, { Adicional } from '../screens/AdicionaisScreen';
import CreateAdicionalScreen from '../screens/CreateAdicionalScreen';
import EditAdicionalScreen from '../screens/EditAdicionalScreen';
import SegurosScreen, { Seguro } from '../screens/SegurosScreen';
import CreateSeguroScreen from '../screens/CreateSeguroScreen';
import EditSeguroScreen from '../screens/EditSeguroScreen';
import ReservasScreen, { Reserva } from '../screens/ReservasScreen';
import CreateReservaScreen from '../screens/CreateReservaScreen';
import EditReservaScreen from '../screens/EditReservaScreen';
import PagamentosScreen, { Pagamento } from '../screens/PagamentosScreen';
import CreatePagamentoScreen from '../screens/CreatePagamentoScreen';
import EditPagamentoScreen from '../screens/EditPagamentoScreen';
import ItensAdicionaisScreen, { ItemAdicional } from '../screens/ItensAdicionaisScreen';
import CreateItemAdicionalScreen from '../screens/CreateItemAdicionalScreen';
import EditItemAdicionalScreen from '../screens/EditItemAdicionalScreen';
import ManutencoesScreen, { Manutencao } from '../screens/ManutencoesScreen';
import CreateManutencaoScreen from '../screens/CreateManutencaoScreen';
import EditManutencaoScreen from '../screens/EditManutencaoScreen';

export type DrawerParamList = {
  Home: undefined;
  Pessoa: undefined;
  Clientes: undefined;
  CreateCliente: undefined;
  EditCliente: { cliente: Cliente };
  Carteiras: undefined;
  CreateCarteira: undefined;
  EditCarteira: { carteira: Carteira };
  Funcionarios: undefined;
  CreateFuncionario: undefined;
  EditFuncionario: { funcionario: Funcionario };
  Agencias: undefined;
  CreateAgencia: undefined;
  EditAgencia: { agencia: Agencia };
  Categorias: undefined;
  CreateCategoria: undefined;
  EditCategoria: { categoria: Categoria };
  Veiculos: undefined;
  CreateVeiculo: undefined;
  EditVeiculo: { veiculo: Veiculo };
  Adicionais: undefined;
  CreateAdicional: undefined;
  EditAdicional: { adicional: Adicional };
  Seguros: undefined;
  CreateSeguro: undefined;
  EditSeguro: { seguro: Seguro };
  Reservas: undefined;
  CreateReserva: undefined;
  EditReserva: { reserva: Reserva };
  Pagamentos: undefined;
  CreatePagamento: undefined;
  EditPagamento: { pagamento: Pagamento };
  ItensAdicionais: undefined;
  CreateItemAdicional: undefined;
  EditItemAdicional: { itemAdicional: ItemAdicional };
  Manutencoes: undefined;
  CreateManutencao: undefined;
  EditManutencao: { manutencao: Manutencao };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          title: 'Clientes',
        }}
      />
      <Drawer.Screen
        name="CreateCliente"
        component={CreateClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo cliente' }}
      />
      <Drawer.Screen
        name="EditCliente"
        component={EditClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar cliente' }}
      />
      <Drawer.Screen
        name="Carteiras"
        component={CarteirasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />,
          title: 'Carteiras',
        }}
      />
      <Drawer.Screen
        name="CreateCarteira"
        component={CreateCarteiraScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova carteira' }}
      />
      <Drawer.Screen
        name="EditCarteira"
        component={EditCarteiraScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar carteira' }}
      />
      <Drawer.Screen
        name="Funcionarios"
        component={FuncionariosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
          title: 'Funcionários',
        }}
      />
      <Drawer.Screen
        name="CreateFuncionario"
        component={CreateFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo funcionário' }}
      />
      <Drawer.Screen
        name="EditFuncionario"
        component={EditFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar funcionário' }}
      />
      <Drawer.Screen
        name="Agencias"
        component={AgenciasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="business-outline" size={size} color={color} />,
          title: 'Agências',
        }}
      />
      <Drawer.Screen
        name="CreateAgencia"
        component={CreateAgenciaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova agência' }}
      />
      <Drawer.Screen
        name="EditAgencia"
        component={EditAgenciaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar agência' }}
      />
      <Drawer.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="pricetags-outline" size={size} color={color} />,
          title: 'Categorias',
        }}
      />
      <Drawer.Screen
        name="CreateCategoria"
        component={CreateCategoriaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova categoria' }}
      />
      <Drawer.Screen
        name="EditCategoria"
        component={EditCategoriaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="Veiculos"
        component={VeiculosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="car-outline" size={size} color={color} />,
          title: 'Veículos',
        }}
      />
      <Drawer.Screen
        name="CreateVeiculo"
        component={CreateVeiculoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo veículo' }}
      />
      <Drawer.Screen
        name="EditVeiculo"
        component={EditVeiculoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar veículo' }}
      />
      <Drawer.Screen
        name="Adicionais"
        component={AdicionaisScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
          title: 'Adicionais',
        }}
      />
      <Drawer.Screen
        name="CreateAdicional"
        component={CreateAdicionalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo adicional' }}
      />
      <Drawer.Screen
        name="EditAdicional"
        component={EditAdicionalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar adicional' }}
      />
      <Drawer.Screen
        name="Seguros"
        component={SegurosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
          title: 'Seguros',
        }}
      />
      <Drawer.Screen
        name="CreateSeguro"
        component={CreateSeguroScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo seguro' }}
      />
      <Drawer.Screen
        name="EditSeguro"
        component={EditSeguroScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar seguro' }}
      />
      <Drawer.Screen
        name="Reservas"
        component={ReservasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          title: 'Reservas',
        }}
      />
      <Drawer.Screen
        name="CreateReserva"
        component={CreateReservaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova reserva' }}
      />
      <Drawer.Screen
        name="EditReserva"
        component={EditReservaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar reserva' }}
      />
      <Drawer.Screen
        name="Pagamentos"
        component={PagamentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
          title: 'Pagamentos',
        }}
      />
      <Drawer.Screen
        name="CreatePagamento"
        component={CreatePagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo pagamento' }}
      />
      <Drawer.Screen
        name="EditPagamento"
        component={EditPagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar pagamento' }}
      />
      <Drawer.Screen
        name="ItensAdicionais"
        component={ItensAdicionaisScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="gift-outline" size={size} color={color} />,
          title: 'Itens Adicionais',
        }}
      />
      <Drawer.Screen
        name="CreateItemAdicional"
        component={CreateItemAdicionalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo item adicional' }}
      />
      <Drawer.Screen
        name="EditItemAdicional"
        component={EditItemAdicionalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar item adicional' }}
      />
      <Drawer.Screen
        name="Manutencoes"
        component={ManutencoesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />,
          title: 'Manutenções',
        }}
      />
      <Drawer.Screen
        name="CreateManutencao"
        component={CreateManutencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova manutenção' }}
      />
      <Drawer.Screen
        name="EditManutencao"
        component={EditManutencaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar manutenção' }}
      />
      <Drawer.Screen
        name="Pessoa"
        component={PessoaScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
          title: 'Pessoa',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
