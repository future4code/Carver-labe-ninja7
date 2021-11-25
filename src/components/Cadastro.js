import React from "react";
import axios from "axios";
import styled from "styled-components";

const DivCadastro = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


export default class Cadastro extends React.Component {
    state = {
        inputTitulo: "",
        inputDescricao: "",
        inputPreco: "",
        inputData: "",
        checkBoxCredito: false,
        checkBoxDebito: false,
        checkBoxBoleto: false,
        checkBoxPix: false,
    }

    criarTrabalho = () => {
        const url = "https://labeninjas.herokuapp.com/jobs"

        const copiaPagamento = [];

        if (this.state.checkBoxCredito === true) {
            copiaPagamento.push("Crédito");
        }

        if (this.state.checkBoxDebito === true) {
            copiaPagamento.push("Débito");
        }

        if (this.state.checkBoxBoleto === true) {
            copiaPagamento.push("Boleto");
        }

        if (this.state.checkBoxPix === true) {
            copiaPagamento.push("Pix");
        }

        const body = {
            title: this.state.inputTitulo,
            description: this.state.inputDescricao,
            price: this.state.inputPreco,
            paymentMethods: copiaPagamento,
            dueDate: this.state.inputData,
        }
        axios.post(url, body, {
            headers: {
                Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
            }
        })
            .then((res) => {
                console.log("deu certo", res.data)
            })
            .catch((err) => {
                console.log("deu ruim", err.response.data.errors)
            })
    }

    onChangeInputTitulo = (e) => {
        this.setState({ inputTitulo: e.target.value })
    }

    onChangeInputDescricao = (e) => {
        this.setState({ inputDescricao: e.target.value })
    }

    onChangeInputPreco = (e) => {
        this.setState({ inputPreco: Number(e.target.value) })
    }

    onChangeInputsPagamentos = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onChangeInputData = (e) => {
        this.setState({ inputData: e.target.value });
    };

    render() {
        console.log(this.state.inputData)
        return (
            <div>
                <DivCadastro>
                    <div>
                        <label>Título:</label>
                        <input
                            value={this.state.inputTitulo}
                            onChange={this.onChangeInputTitulo} />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input
                            value={this.state.inputDescricao}
                            onChange={this.onChangeInputDescricao} />
                    </div>
                    <div>
                        <label>Preço:</label>
                        <input
                            type="number"
                            value={this.state.inputPreco}
                            onChange={this.onChangeInputPreco} />
                    </div>
                    <div>
                        <input
                            name="checkBoxCredito"
                            type="checkbox"
                            checked={this.state.checkBoxCredito}
                            onChange={this.onChangeInputsPagamentos}
                        />
                        <label>crédito</label>
                        <input
                            name="checkBoxDebito"
                            type="checkbox"
                            checked={this.state.checkBoxDebito}
                            onChange={this.onChangeInputsPagamentos}
                        />
                        <label>débito</label>
                        <input
                            name="checkBoxBoleto"
                            type="checkbox"
                            checked={this.state.checkBoxBoleto}
                            onChange={this.onChangeInputsPagamentos}
                        />
                        <label>boleto</label>
                        <input
                            name="checkBoxPix"
                            type="checkbox"
                            checked={this.state.checkBoxPix}
                            onChange={this.onChangeInputsPagamentos}
                        />
                        <label>pix</label>
                    </div>
                    <input type="date"
                        value={this.state.inputData}
                        onChange={this.onChangeInputData} />
                    <button onClick={this.criarTrabalho}>Cadastrar</button>
                </DivCadastro>
            </div>
        )
    }
}