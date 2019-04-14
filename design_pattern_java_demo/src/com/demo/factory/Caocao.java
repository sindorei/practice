package com.demo.factory;

public class Caocao implements ISwordFactory {
	public AbstractSword createSword() {
		return new QixingSword();
	}

}
