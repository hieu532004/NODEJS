import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Pagination, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd';

import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { env } from '../constants/getEnvs';
import { axiosClient } from '../libs/axiousClient';
import { useNavigate, useSearchParams } from 'react-router';


interface DataType {
    _id: string;
    product_name: string;
    price: number;
    stock: number;
    model_year: number;
    category: {
        category_name: string;
    }
    thumbbail: string;
}

export default function ProductsPage() {
    const navigate = useNavigate();
    //get page vaf limit 
    const [messageApi, contextHolder] = message.useMessage();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    console.log("Page + limit", page, limit)


    /**---| BEGIN GET PRODUCTS | */
    const fetchProducts = async () => {
        const response = await axiosClient.get(`${env.API_URL}/v1/products?page=${page}&limit=${limit}`);
        return response.data;
    };

    const KEYs = {
        getProducts: () => {
            return ['products', page, limit] // LƯU Ý Cache KEY: Thêm query parameter vào cache key để tự động refetch khi có thay đổi
        }
    }
    const queryProducts = useQuery({
        queryKey: KEYs.getProducts(), // LƯU Ý Cache KEY: Thêm query parameter vào cache key để tự động refetch khi có thay đổi
        queryFn: fetchProducts,
    });
    console.log('queryProducts', queryProducts.data);
    /**---| END GET PRODUCTS | */


    const queryClient = useQueryClient()
    /**---| BEGIN DELETE PRODUCTS | */
    const deleteProduct = async (id: string) => {
        const response = await axiosClient.delete(`${env.API_URL}/v1/products/${id}`);
        return response.data;

    }
    const mutationDelete = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            // Làm tươi lại danh sách sản phẩm sau khi xóa thành công
            queryClient.invalidateQueries({ queryKey: KEYs.getProducts() })
            //Hiển thị massage xóa thành công
            messageApi.open({
                type: 'success',
                content: 'Xóa Product thành công!',
            });
        },
        onError: (err) => {
            console.log('Xóa Product không thành công!', err);
            messageApi.open({
                type: 'error',
                content: 'Xóa Product không thành công!',
            });
            //Hiển thị message xóa thất bại
        }
    });

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Thumb',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => <Avatar shape="square" src={text} />
        },
        {
            title: 'Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => {
                return <span>{record.category.category_name}</span>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Model year',
            dataIndex: 'model_year',
            key: 'model_year',
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        console.log('Edit', record._id)
                    }} icon={<EditOutlined />} />
                    <Popconfirm
                        title="Delete the product"
                        description={(`Are you sure to delete this product ${record.product_name}?`)}
                        onConfirm={async () => {
                            console.log('Confirmed', record._id)
                            mutationDelete.mutate(record._id)
                            console.log('variables', mutationDelete.variables)
                        }}
                        onCancel={() => messageApi.open({
                            type: 'error',
                            content: 'Xóa Product không thành công!',
                        })}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            loading={mutationDelete.variables === record._id && mutationDelete.status === 'pending'}
                            type='dashed'
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    /**---| END DELETE PRODUCTS | */
    return (
        <>
            {contextHolder}
            <title>Product Manager</title>
            <Card variant='borderless'
                onClick={() => console.log('Card clicked')}
                title="Products List"
                extra={<Button onClick={() => console.log('Thêm mới sản phẩm')}
                    icon={<PlusOutlined />}
                    type='primary'>
                    Thêm mới
                </Button>} >
                <Flex vertical gap="middle" >
                    <Table<DataType>
                        columns={columns}
                        dataSource={queryProducts?.data?.data?.products ?? []}
                        pagination={false}
                    />
                    <Pagination
                        align="center"
                        defaultCurrent={6}
                        total={queryProducts?.data?.data?.pagination.totalRecord ?? 0}
                        onChange={(page, pageSize) => {
                            console.log(page, pageSize)
                            navigate(`/products?page=${page}&limit=${pageSize}`)
                        }}
                    />
                </Flex>
            </Card>
        </>
    )
}
