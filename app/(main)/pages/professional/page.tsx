/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';
import { Demo } from '@/types';
import { UsersService } from '@/service/UserService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let professionalVazio: Projeto.Professional = {
        id: 0,
        fullName: '',
        email: '',
        passwordHash: '',
        phoneNumber: '',
        specialty: '',
    };

    const [professionals, setProfessionals] = useState(null);
    const [professionalDialog, setProfessionalDialog] = useState(false);
    const [deleteProfessionalDialog, setDeleteProfessionalDialog] = useState(false);
    const [deleteProfessionalsDialog, setDeleteProfessionalsDialog] = useState(false);
    const [professional, setProfessional] = useState<Projeto.Professional>(professionalVazio);
    const [selectedProfessionals, setSelectedProfessionals] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const usersService = new UsersService();


    useEffect(() => {

        usersService.listarTodos()
            .then((response) => {
                console.log(response.data)
                setProfessionals(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const openNew = () => {
        setProfessional(professionalVazio);
        setSubmitted(false);
        setProfessionalDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProfessionalDialog(false);
    };

    const hideDeleteProfessionalDialog= () => {
        setDeleteProfessionalDialog(false);
    };

    const hideDeleteProfessionalsDialog = () => {
        setDeleteProfessionalsDialog(false);
    };

    const saveProfessional = () => {
        setSubmitted(true);

        // if (professional.fullName.trim()) {
        //     let _professionals = [...(professional as any)];
        //     let _professional = { ...professional };
        //     if (professional.id) {
        //         const index = findIndexById(professional.id);

        //         _professionals[index] = _professional;
        //         toast.current?.show({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Updated',
        //             life: 3000
        //         });
        //     } else {
        //         _professional.id = createId();
        //         _professionals.push(_professional);
        //         toast.current?.show({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Created',
        //             life: 3000
        //         });
        //     }

        //     setProfessionals(_professionals as any);
        //     setProfessionalDialog(false);
        //     setProfessional(professionalVazio);
        // }
    };

    const editProfessioanl= (professional: Projeto.Professional) => {
        setProfessional({ ...professional });
        setProfessionalDialog(true);
    };

    const confirmDeleteProfessional = (professional: Projeto.Professional) => {
        setProfessional(professional);
        setDeleteProfessionalDialog(true);
    };

    const deleteProfessional = () => {
        // let _professionals = (professionals as any)?.filter((val: any) => val.id !== professional.id);
        // setProfessionals(_professionals);
        // setDeleteProfessionalDialog(false);
        // setProfessional(professionalVazio);
        // toast.current?.show({
        //     severity: 'success',
        //     summary: 'Successful',
        //     detail: 'Product Deleted',
        //     life: 3000
        // });
    };

    // const findIndexById = (id: number) => {
    //     let index = -1;
    //     for (let i = 0; i < (professionals as any)?.length; i++) {
    //         if ((professionals as any)[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    // const createId = () => {
    //     let id = 0;
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProfessionalsDialog(true);
    };

    const deleteSelectedProfessional = () => {
        let _professionals = (professional as any)?.filter((val: any) => !(selectedProfessionals as any)?.includes(val));
        setProfessionals(_professionals);
        setDeleteProfessionalsDialog(false);
        setSelectedProfessionals(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000
        });
    };

    // const onCategoryChange = (e: RadioButtonChangeEvent) => {
    //     let _professional = { ...product };
    //     _professional['category'] = e.value;
    //     setProfessional(_professional);
    // };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Projeto.Professional) => {
        const val = (e.target && e.target.value) || '';
        let _professional = { ...professional };
        _professional[field]// = val;

        setProfessional(_professional);
    };

    // const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    //     const val = e.value || 0;
    //     let _professional = { ...product };
    //     _professional[`${name}`] = val;

    //     setProfessional(_professional);
    // };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProfessionals || !(selectedProfessionals as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };


    const nomeBodyTemplate = (rowData: Projeto.Professional) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.fullName}
            </>
        );
    };

    const phoneBodyTemplate = (rowData: Projeto.Professional) => {
        return (
            <>
                <span className="p-column-title">Contato</span>
                {rowData.phoneNumber}
            </>
        );
    };

    const emailBodyTemplate = (rowData: Projeto.Professional) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    // const imageBodyTemplate = (rowData: Projeto.Professional) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Image</span>
    //             <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
    //         </>
    //     );
    // };

    const actionBodyTemplate = (rowData: Projeto.Professional) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProfessioanl(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProfessional(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Profissionais</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const professionalDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveProfessional} />
        </>
    );
    const deleteProfessioanlDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteProfessionalDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteProfessional} />
        </>
    );
    const deleteProfessionalsDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteProfessionalsDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedProfessional} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={professionals}
                        selection={selectedProfessionals}
                        onSelectionChange={(e) => setSelectedProfessionals(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="numero" header="Número"sortable body={phoneBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={professionalDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={professionalDialogFooter} onHide={hideDialog}>
                        {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="name">Nome</label>
                            <InputText
                                id="name"
                                value={professional.fullName}
                                onChange={(e) => onInputChange(e, 'fullName')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !professional.fullName
                                })}
                            />
                            {submitted && !professional.fullName && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            {/* <InputTextarea id="description" value={professional.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} /> */}
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    {/* <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} /> */}
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    {/* <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} /> */}
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    {/* <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} /> */}
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    {/* <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} /> */}
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        {/* <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={profe.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                            </div>
                        </div> */}
                    </Dialog>

                    <Dialog visible={deleteProfessionalDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfessioanlDialogFooter} onHide={hideDeleteProfessionalDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {professional && (
                                <span>
                                    Você tem certeza que deseja deletar? <b>{professional.fullName}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProfessionalsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfessionalsDialogFooter} onHide={hideDeleteProfessionalsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {professional && <span>Você tem certeza que desja excluir os professionais selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
