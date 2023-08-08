import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import moment from "moment";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Menu from "./Menu";
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import OpenSans from '@react-pdf/font/';
import { removeDiacritics } from 'diacritic';
// Update the path to your font file

// Register the Vietnamese font

Font.register({ family: 'Open Sans', fonts: [{ src: OpenSans }] });
const InvoicePDF = ({ invoiceData }) => {
    useEffect(() => {
        getData();
    }, [])

    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const getData = () => {
        const token = sessionStorage.getItem('token')

        axios.get(`https://localhost:7225/api/Invoices/${invoiceData[0].invoice.id}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((result) => {
                setData(result.data)
                setUser(result.data.applicationUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    console.log('data', data)
    console.log('ok', invoiceData)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>Invoice</Text>
                </View>
                <Fragment>
                    <View style={styles.invoiceNoContainer}>
                        <Text style={styles.label}>Code:</Text>
                        <Text style={styles.invoiceDate}>{data.code}</Text>
                    </View >

                    <View style={styles.invoiceDateContainer}>
                        <Text style={styles.label}>Date:</Text>
                        <Text >{data.issuedDate}</Text>
                    </View >
                </Fragment>
                <View style={styles.headerContainer}>
                    <Text style={styles.billTo}>Bill To:</Text>
                    <Text >FullName: {user.fullName}</Text>
                    <Text >Adress: {data.shippingAddress}</Text>
                    <Text>Phone: {data.shippingPhone}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.container}>
                        <Text style={styles.description}>Product Name</Text>
                        <Text style={styles.qty}>Stock</Text>
                        <Text style={styles.rate}>Price</Text>
                        <Text style={styles.amount}>unitPrice</Text>
                    </View>
                    {invoiceData.map(item =>
                        <View style={styles.row1} >
                            <Text style={styles.description1}>{item.product.name}</Text>
                            <Text style={styles.qty1}>{item.quantity}</Text>
                            <Text style={styles.rate}>{VND.format(item.unitPrice)}</Text>
                            <Text style={styles.amount1}>{VND.format(item.quantity * item.unitPrice)}</Text>
                        </View>
                    )}
                    {invoiceData.map((x, i) =>
                        <View style={styles.row2} key={`BR${i}`}>
                            <Text style={styles.description2}>-</Text>
                            <Text style={styles.qty2}>-</Text>
                            <Text style={styles.rate2}>-</Text>
                            <Text style={styles.amount2}>-</Text>
                        </View>
                    )}
                    <View style={styles.row3}>
                        <Text style={styles.description3}>TOTAL</Text>
                        <Text style={styles.total3}>{VND.format(data.total)}</Text>
                    </View>

                </View>
                <View style={styles.titleContainer1}>
                    <Text style={styles.reportTitle1}>Thank you for your business</Text>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Times-Roman',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    reportTitle: {
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    },
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
    row1: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description1: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty1: {
        width: '10%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate1: {
        width: '15%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount1: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    row2: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    description2: {
        width: '60%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    qty2: {
        width: '10%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    rate2: {
        width: '15%',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
    },
    amount2: {
        width: '15%',
    },
    row3: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description3: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: '#bff0fd',
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total3: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    titleContainer1: {
        flexDirection: 'row',
        marginTop: 12
    },
    reportTitle1: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

export default InvoicePDF;